import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar
} from "drizzle-orm/pg-core";
import "dotenv/config";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  organizer_id: varchar("org_id", { length: 255 }),
  title: varchar("title", { length: 200 }),
  description: text("description"),  
  total_seats: integer("total_seats"),
  rem_seats: integer("rem_seats"),
  designation: varchar("designation", { length: 100 }),
  location: varchar("location", { length: 200 }),
  date: timestamp("date"),
  st_time: timestamp("st_time"),
  end_time: timestamp("end_time"),
  img_id: varchar("img_id", { length: 500 }), 
  img_url: varchar("img_url", { length: 200 }),
});


export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 200 }),
  eventId: integer("eventId").references(() => events.id, {
    onDelete: "cascade",
    onUpdate: "no action",
  }),
  numofSeats : integer('numofSeats')
});
