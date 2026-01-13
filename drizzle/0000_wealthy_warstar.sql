CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(200),
	"eventId" integer,
	"numofSeats" integer
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" varchar(255),
	"title" varchar(200),
	"description" text,
	"total_seats" integer,
	"rem_seats" integer,
	"designation" varchar(100),
	"location" varchar(200),
	"date" timestamp,
	"st_time" timestamp,
	"end_time" timestamp,
	"img_id" varchar(500),
	"img_url" varchar(200)
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;