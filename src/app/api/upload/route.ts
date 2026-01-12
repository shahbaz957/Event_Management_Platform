import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import fs from "fs/promises";
import cloudinary from "@/lib/cloudinary";
import { events } from "@/db/schema";
import os from "os";
import path from "path";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    /* ---------- IMAGE ---------- */
    const image = formData.get("image") as File | null;
    let image_id: string | null = null;
    let image_url: string | null = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const tmpPath = path.join(os.tmpdir(), `${Date.now()}-${image.name}`);
      await fs.writeFile(tmpPath, buffer);

      const uploadRes = await cloudinary.uploader.upload(tmpPath, {
        folder: "next_uploads",
      });

      image_id = uploadRes.public_id;
      image_url = uploadRes.secure_url;

      await fs.unlink(tmpPath);
    }

    /* ---------- DATE + TIME ---------- */
    const dateStr = formData.get("date") as string;
    const stTimeStr = formData.get("st_time") as string;
    const endTimeStr = formData.get("end_time") as string;

    const startDateTime = new Date(`${dateStr}T${stTimeStr}`);
    const endDateTime = new Date(`${dateStr}T${endTimeStr}`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      throw new Error("Invalid date or time");
    }

    /* ---------- DB INSERT ---------- */
    const inserted = await db
      .insert(events)
      .values({
        organizer_id: userId, // ✅ Clerk user id
        title: formData.get("title") as string,
        description: formData.get("desc") as string,
        total_seats: Number(formData.get("total_seats")),
        rem_seats: Number(formData.get("total_seats")),
        designation: formData.get("designation") as string,
        location: formData.get("location") as string,

        date: new Date(dateStr),
        st_time: startDateTime,
        end_time: endDateTime,

        img_id: image_id,
        img_url: image_url,
      })
      .returning();

    return NextResponse.json({ success: true, event: inserted[0] });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create event" },
      { status: 500 }
    );
  }
}
