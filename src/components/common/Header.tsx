"use client";

import React from "react";
import { UserButton, useUser} from "@clerk/nextjs";
import Link from "next/link";
import { Loader } from "lucide-react";

function Header() {
  const { isSignedIn, user , isLoaded } = useUser();
  const userRole = user?.publicMetadata?.role as string;
  if (!isLoaded) return <div className="flex items-center"><Loader/></div>
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight cursor-pointer">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Event
          </span>
          <span className="text-shadow-indigo-200 dark:text-white ml-2">Bridge</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        {!isSignedIn ? (
          <>
            <Link href="/sign-in">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
                Sign In
              </button>
            </Link>

            <Link href="/sign-up">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            {userRole === "organizer" && (
              <>
                <Link
                  href="/create-event"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Create Event
                </Link>

                <Link
                  href="/analytics"
                  className="px-4 py-2 text-shadow-white hover:text-blue-600 transition"
                >
                  Analytics
                </Link>
              </>
            )}

            <Link
              href="/my-bookings"
              className="px-4 py-2 text-shadow-white hover:text-blue-600 transition"
            >
              My Bookings
            </Link>

            <UserButton />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
