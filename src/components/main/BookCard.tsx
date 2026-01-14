"use client";
import React from "react";
import Image from "next/image";
import { MapPin, Clock, Users } from "lucide-react";

interface Booking {
  bookingId: string;
  eventId: string;
  title: string;
  description: string;
  location: string;
  img_url: string;
  date: Date;
  st_time: Date;
  end_time: Date;
  seatCount: number;
}

interface BookingProps {
  booking: Booking;
onDelete?: (bookingId: string) => void;
}

function BookCard({ booking , onDelete}: BookingProps) {
  const eventDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const startTime = new Date(booking.st_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(booking.end_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/delete-booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: booking.bookingId,
          eventId: booking.eventId,
          numofSeats: booking.seatCount,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok){
        onDelete(booking.bookingId)
      }
    } catch (error) {
      console.log("ERROR : ", error);
    }
  };

  return (
    <div className="group bg-zinc-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-zinc-800 max-w-sm hover:border-zinc-700">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={booking.img_url}
          alt={booking.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Seats Badge */}
        <div className="absolute top-3 right-3 bg-green-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
          {booking.seatCount} seats booked
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
          {booking.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {booking.description}
        </p>

        {/* Details */}
        <div className="space-y-2">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock className="w-4 h-4 text-green-400" />
            <span>
              {eventDate} • {startTime} – {endTime}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="line-clamp-1">{booking.location}</span>
          </div>

          {/* Seats */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Users className="w-4 h-4 text-green-400" />
            <span>{booking.seatCount} seats booked</span>
          </div>
        </div>

        {/* Booking Badge */}
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <span className="inline-block bg-green-600/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full border border-green-500/30">
            Booking Confirmed
          </span>
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors"
            onClick={handleDelete}
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
