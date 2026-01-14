"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BookCard from "./BookCard";
import { Loader2 } from "lucide-react";

function BookGrid() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [bookings, setBookings] = useState<any[] | null>(null); // allow null initially
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/bookings`, { cache: "no-store" });
      const data = await res.json();
      setBookings(data.bookings || []); // default to empty array
    } catch (error) {
      console.log("ERROR : ", error);
      setBookings([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchBookings();
  }, [isLoaded, isSignedIn]);

  const handleBookingDelete = (bookingId: string) => {
    setBookings(prev => prev?.filter(b => b.bookingId !== bookingId) || []);
  };

  if (!isLoaded || !isSignedIn || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-green-500" />
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <BookCard
          key={booking.bookingId}
          booking={booking}
          onDelete={handleBookingDelete}
        />
      ))}
    </div>
  );
}

export default BookGrid;
