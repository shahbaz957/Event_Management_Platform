import { events } from "@/db/schema";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  // context: { params: Promise<{ id: string }> }
  context : {params : Promise<{id : string}>}
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
      .limit(1);
      
    if (event.length === 0) {
      return NextResponse.json(
        { message: "Event not found" }, 
        { status: 404 }
      );
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