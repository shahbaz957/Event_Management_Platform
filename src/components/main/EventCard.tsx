"use client";
import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

interface Event {
  id : string,
  organizer_id: string;
  title: string;
  description: string;
  total_seats: number;
  remaining_seats: number;
  status: string;
  location: string;
  img_url: string;
  date: Date;
  start_time: Date;
  end_time: Date;
}

interface EventProps {
  event: Event;
}

function EventCard({ event }: EventProps) {
  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const startTime = new Date(event.start_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(event.end_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="group bg-zinc-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-zinc-800 max-w-sm hover:border-zinc-700">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event?.img_url}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
          {event.remaining_seats} seats left
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {event.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{eventDate}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>
              {startTime} - {endTime}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {/* Total Seats */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Users className="w-4 h-4 text-blue-400" />
            <span>{event.total_seats} total seats</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/30">
            {event.status}
          </span>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default EventCard;