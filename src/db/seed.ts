import { db } from "./index";
import { events } from "./schema";
import { migrate } from "./index";
import "dotenv/config";

async function seed() {
  console.log("Seeding the Database");

  // Run migrations first
  await migrate();

  // Insert events
  await db.insert(events).values([
    {
      organizer_id: "user_37T6xOwu7ebuuptLP1mgDmmgNVW",
      title: "Tech Event",
      description: "This will be a very beautiful event",
      total_seats: 50,
      rem_seats: 50,
      designation: "CEO at Company",
      location: "DHA phase-7",
      date: new Date("2025-01-15"),
      st_time: new Date("2025-01-15T10:30:00"),
      end_time: new Date("2025-01-15T12:30:00"),
      img_id: "dk6zrcqapo0qjdbjkmry",
      img_url:
        "http://res.cloudinary.com/dujlqjtr2/image/upload/v1766216417/dk6zrcqapo0qjdbjkmry.jpg",
    },
    {
      organizer_id: "user_37T6xOwu7ebuuptLP1mgDmmgNVW",
      title: "AI Startup Meetup",
      description: "A networking meetup for AI startup founders and enthusiasts.",
      total_seats: 80,
      rem_seats: 80,
      designation: "Founder & AI Engineer",
      location: "Gulberg III, Lahore",
      date: new Date("2025-02-02"),
      st_time: new Date("2025-02-02T15:00:00"),
      end_time: new Date("2025-02-02T17:30:00"),
      img_id: "dk6zrcqapo0qjdbjkmry",
      img_url:
        "http://res.cloudinary.com/dujlqjtr2/image/upload/v1766216417/dk6zrcqapo0qjdbjkmry.jpg",
    },
    {
      organizer_id: "user_37T6xOwu7ebuuptLP1mgDmmgNVW",
      title: "Full Stack Development Workshop",
      description: "Hands-on workshop covering frontend and backend development.",
      total_seats: 40,
      rem_seats: 40,
      designation: "Senior Full Stack Developer",
      location: "Johar Town, Lahore",
      date: new Date("2025-02-10"),
      st_time: new Date("2025-02-10T11:00:00"),
      end_time: new Date("2025-02-10T14:00:00"),
      img_id: "dk6zrcqapo0qjdbjkmry",
      img_url:
        "http://res.cloudinary.com/dujlqjtr2/image/upload/v1766216417/dk6zrcqapo0qjdbjkmry.jpg",
    },
    {
      organizer_id: "user_37T6xOwu7ebuuptLP1mgDmmgNVW",
      title: "Data Science Bootcamp",
      description: "Beginner-friendly bootcamp focused on real-world data science.",
      total_seats: 60,
      rem_seats: 60,
      designation: "Lead Data Scientist",
      location: "Clifton, Karachi",
      date: new Date("2025-03-05"),
      st_time: new Date("2025-03-05T09:30:00"),
      end_time: new Date("2025-03-05T13:30:00"),
      img_id: "dk6zrcqapo0qjdbjkmry",
      img_url:
        "http://res.cloudinary.com/dujlqjtr2/image/upload/v1766216417/dk6zrcqapo0qjdbjkmry.jpg",
    },
    {
      organizer_id: "user_37T6xOwu7ebuuptLP1mgDmmgNVW",
      title: "Cybersecurity Awareness Seminar",
      description: "Learn modern cybersecurity threats and protection strategies.",
      total_seats: 100,
      rem_seats: 100,
      designation: "Cybersecurity Consultant",
      location: "Blue Area, Islamabad",
      date: new Date("2025-03-18"),
      st_time: new Date("2025-03-18T16:00:00"),
      end_time: new Date("2025-03-18T18:00:00"),
      img_id: "dk6zrcqapo0qjdbjkmry",
      img_url:
        "http://res.cloudinary.com/dujlqjtr2/image/upload/v1766216417/dk6zrcqapo0qjdbjkmry.jpg",
    },
    {
      organizer_id: "user_37T6xOwu7ebuuptLP1mgDmmgNVW",
      title: "Product Management Talk",
      description: "Insights into building and scaling successful tech products.",
      total_seats: 55,
      rem_seats: 55,
      designation: "Product Manager",
      location: "DHA Phase 6, Karachi",
      date: new Date("2025-04-01"),
      st_time: new Date("2025-04-01T18:00:00"),
      end_time: new Date("2025-04-01T20:00:00"),
      img_id: "dk6zrcqapo0qjdbjkmry",
      img_url:
        "http://res.cloudinary.com/dujlqjtr2/image/upload/v1766216417/dk6zrcqapo0qjdbjkmry.jpg",
    },
  ]);

  console.log("Seeding completed");
  process.exit(0);
}

seed().catch((err) => {
  console.log("Error occurred while seeding the Database:", err);
  process.exit(1);
});
