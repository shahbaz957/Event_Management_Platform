import { db } from "./index";
import { events } from "./schema";
import "dotenv/config";

export async function fetchAllEvents(){
    return await db.
    select({
        id : events.id,
        organizer_id : events.organizer_id,
        title : events.title,
        description : events.description,
        total_seats : events.total_seats,
        remaining_seats : events.rem_seats,
        status : events.designation,
        location : events.location,
        img_url : events.img_url,
        date : events.date,
        start_time : events.st_time,
        end_time : events.end_time
    }).from(events)
}

