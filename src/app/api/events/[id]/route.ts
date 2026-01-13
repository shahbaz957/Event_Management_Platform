import { events } from "@/db/schema";
import { db } from "@/db/index";
import { eq, desc } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { bookings } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  // context: { params: Promise<{ id: string }> }
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("ID from params:", id);

    const eventId = Number(id);
    console.log("Parsed eventId:", eventId);

    if (isNaN(eventId)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const event = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId))
      .limit(1)

    if (event.length === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event[0], { status: 200 });
  } catch (error) {
    console.error("Error occurred while fetching the event by id:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  
  try {
    
    // if (!userId){ 
    //   return NextResponse.json(
    //     {message : "UserId is required"},
    //     {status : 422}
    //   )
    // } 

    const { id } = await context.params;
    const eventId = Number(id);
    const body = await request.json();
    const { seatsBooked , userId } = body;
    if (isNaN(eventId)) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }
    if (!seatsBooked || typeof seatsBooked !== "number") {
      return NextResponse.json(
        { message: "Invalid seats booked" },
        { status: 400 }
      );
    }
    const fevents = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId));
    if (fevents.length === 0) {
      return NextResponse.json(
        { message: "Invalid Event ID" },
        { status: 400 }
      );
    }
    if (fevents[0].rem_seats < seatsBooked) {
      return NextResponse.json(
        { message: "Not enough seats to be Booked" },
        { status: 400 }
      );
    }
    const newRemSeats = Math.max(0, fevents[0].rem_seats - seatsBooked);
    const updated = await db
      .update(events)
      .set({ rem_seats: newRemSeats })
      .where(eq(events.id, eventId))
      .returning();

    await db
      .insert(bookings)
      .values({
        userId: userId,
        eventId: eventId,
        numofSeats: seatsBooked,
      })

    return NextResponse.json(
      { message: "Seats are Updated", event: updated},
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR : ", error);
    return NextResponse.json(
      { message: "Remaining Seats or Booking is not updated" },
      { status: 500 }
    );
  }
}
