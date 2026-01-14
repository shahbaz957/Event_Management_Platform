import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { bookings, events } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log(body)
    const { bookingId, eventId, numofSeats } = body;

    if (!bookingId || !eventId || !numofSeats) {
      return NextResponse.json(
        { message: "bookingId, eventId, and numofSeats are required" },
        { status: 422 }
      );
    }

    await db
      .delete(bookings)
      .where(eq(bookings.id, bookingId));

    await db
      .update(events)
      .set({
        rem_seats: sql`${events.rem_seats} + ${numofSeats}`
      })
      .where(eq(events.id, eventId));

    return NextResponse.json({ success: true, message: "Booking deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { message: "Error deleting booking" },
      { status: 500 }
    );
  }
}
