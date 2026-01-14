import { events, bookings } from "@/db/schema";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params?: { id?: string } }
) {
  try {
    const id = context?.params?.id;
    if (!id) {
      return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
    }

    const eventId = Number(id);
    if (isNaN(eventId)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    const eventsArr = await db.select().from(events).where(eq(events.id, eventId)).limit(1);

    if (!eventsArr || eventsArr.length === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(eventsArr[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: { params?: { id?: string } }
) {
  try {
    const id = context?.params?.id;
    if (!id) {
      return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
    }

    const eventId = Number(id);
    if (isNaN(eventId)) {
      return NextResponse.json({ message: "Invalid Event ID" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const seatsBooked = typeof body.seatsBooked === "number" ? body.seatsBooked : null;
    const userId = body.userId ?? null;

    if (!userId) {
      return NextResponse.json({ message: "Please Sign In for registration" }, { status: 400 });
    }
    if (!seatsBooked || seatsBooked <= 0) {
      return NextResponse.json({ message: "Invalid seats booked" }, { status: 400 });
    }

    const eventsArr = await db.select().from(events).where(eq(events.id, eventId));

    if (!eventsArr || eventsArr.length === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const eventData = eventsArr[0];

    if (eventData.rem_seats < seatsBooked) {
      return NextResponse.json({ message: "Not enough seats available" }, { status: 400 });
    }

    const updatedEvent = await db
      .update(events)
      .set({ rem_seats: eventData.rem_seats - seatsBooked })
      .where(eq(events.id, eventId))
      .returning();

    await db.insert(bookings).values({
      userId,
      eventId,
      numofSeats: seatsBooked,
    });

    return NextResponse.json({ message: "Booking successful", event: updatedEvent[0] }, { status: 200 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ message: "Booking failed" }, { status: 500 });
  }
}
