"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Event } from "@/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";

function EventGrid() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        // console.log(data)
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold text-lg mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h3 className="text-gray-800 font-semibold text-xl mb-2">
            No Events Found
          </h3>
          <p className="text-gray-600">
            There are no events available at the moment. Check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-shadow-amber-50 mb-2">Upcoming Events</h2>
        <p className="text-shadow-white text-lg mb-4">
          Discover and register for exciting events happening near you
        </p>
        <div className="text-gray-500 text-sm">
          <span className="font-semibold text-blue-600">{events.length}</span>{" "}
          {events.length === 1 ? "event" : "events"} available
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map((event , index) => (
          <Link href={`/event/${event.id}`} key={index}>
          <EventCard event={event}  />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EventGrid;
