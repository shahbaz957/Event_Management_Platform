import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, isOrganizer } = await req.json();
    if (!userId)
      return NextResponse.json({ message: "No Id found" }, { status: 422 });
    if (isOrganizer) {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: "organizer",
        },
      });
    }
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error while setting Role" },
      { status: 500 }
    );
  }
}
