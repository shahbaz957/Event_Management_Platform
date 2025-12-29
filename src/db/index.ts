import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL){
    throw new Error("Database url not found")
}

const sql = neon(process.env.DATABASE_URL)
export const db = drizzle({client : sql})


export async function migrate() {
  console.log("Running migrations...");

  // Create events table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      org_id VARCHAR(255),
      title VARCHAR(200),
      description TEXT,
      total_seats INT,
      rem_seats INT,
      designation VARCHAR(100),
      location VARCHAR(200),
      date TIMESTAMP,
      st_time TIMESTAMP,
      end_time TIMESTAMP,
      img_Id VARCHAR(500),
      img_url VARCHAR(200)
    );
  `);

  // Create bookings table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      userId VARCHAR(200),
      eventId INT REFERENCES events(id) ON DELETE CASCADE,
      numofSeats INT
    );
  `);

  console.log("Migrations completed");
}