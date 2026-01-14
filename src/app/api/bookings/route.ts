import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { bookings, events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest
) {
  try {
    const {userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "UserId is required" },
        { status: 401 }
      );
    }
    const userBookings = await db
      .select({
        bookingId: bookings.id,
        seatCount: bookings.numofSeats,
        eventId: events.id,
        title: events.title,
        description: events.description,
        location: events.location,
        img_url: events.img_url,
        st_time: events.st_time,
        end_time: events.end_time,
        date : events.date
      })
      .from(bookings)
      .innerJoin(events, eq(bookings.eventId, events.id))
      .where(eq(bookings.userId, userId));

    return NextResponse.json({ success: true, bookings: userBookings }, { status: 200 });
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json(
      { message: "Error occurred while fetching bookings" },
      { status: 500 }
    );
  }
}

