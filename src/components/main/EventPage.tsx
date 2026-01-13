"use client";
import React from "react";
import { Event } from "@/types/index";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

function EventPage({ event }: { event: Event }) {
  const {user} = useUser();
  const userValid = user?.id === event.organizer_id;

  const fullName = user?.fullName;
  // Format date and time
  console.log(event)
  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const startTime = new Date(event.st_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(event.end_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  let seatsBooked = event.total_seats - event.rem_seats;
  if (isNaN(seatsBooked)){
    seatsBooked = 0;
  }
  let seatsPercentage = (seatsBooked / event.total_seats) * 100;
  if (isNaN(seatsPercentage)){
    seatsPercentage = 0
  }
  

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-6">
        <Link href={'/'}>
        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Events</span>
        </button> 
        </Link>
      </div>

      {/* Upper Half - Image and Title Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-zinc-800 group">
            <Image
              src={event.img_url}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Seats Badge on Image */}
            <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white font-semibold text-sm">
                {event.rem_seats === 0 ? "Not Available" : "Available"}
              </p>
            </div>
          </div>

          {/* Right - Title and Description */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-block bg-blue-600/20 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-500/30 mb-4">
                {event.designation}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {event.title}
              </h1>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {event.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Total Capacity</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {event.total_seats}
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm">Seats Booked</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">
                  {seatsBooked}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Booking Progress</span>
                <span>{seatsPercentage.toFixed(0)}% Full</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${seatsPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Register Button */}
            {!userValid && 
            <Link href={`/event/${event.id}/register`}>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-[1.02] mt-4">
              Register for Event
            </button>
            </Link>
            }
          </div>
        </div>
      </div>

      {/* Lower Half - Event Details */}
      <div className="container mx-auto px-6 pb-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-400" />
            Event Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date & Time Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-zinc-800">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Event Date</p>
                  <p className="text-white font-semibold text-lg">
                    {eventDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-zinc-800">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Event Time</p>
                  <p className="text-white font-semibold text-lg">
                    {startTime} - {endTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-zinc-800">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Location</p>
                  <p className="text-white font-semibold text-lg">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Organizer & Seats Section */}
            <div className="space-y-4">
              {/* <div className="flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-zinc-800"> */}
                {/* <div className="bg-blue-600/20 p-3 rounded-lg">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Organizer Name</p>
                  <p className="text-white font-semibold text-lg break-all">
                    {fullName?.toLocaleUpperCase()}
                  </p>
                </div> */}
              {/* </div> */}

              <div className="flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-zinc-800">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Designation</p>
                  <p className="text-white font-semibold text-lg">
                    {event.designation}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-zinc-800">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Seating Info</p>
                  <div className="flex items-center gap-4 text-white font-semibold text-lg">
                    <span className={event.rem_seats === 0 ? "text-red-600" : "text-green-400"}>
                      {event.rem_seats} Available
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">
                      {event.total_seats} Total
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;