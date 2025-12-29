import { fetchAllEvents } from "@/db/queries";
import { NextResponse } from "next/server";

export async function GET(){
    const events = await fetchAllEvents();
    return NextResponse.json(events, { status: 200 });
}