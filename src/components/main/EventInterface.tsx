"use client";
import React, { useEffect, useState } from "react";
import { Event } from "@/types";
import Image from "next/image";
import { Loader } from "lucide-react";
import EventPage from "./EventPage";

function EventInterface({ id }: { id: string }) {
  const [event, setEvent] = useState<Event | null>(null);
  console.log(id);
  useEffect(() => {
    async function loadEvent(id: string) {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        console.log(data);
        setEvent(data);
      } catch (error) {
        console.log("Error occured : ", error);
      }
    }
    loadEvent(id);
  }, [id]);

  if (event === null)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div>
      <EventPage event={event} />
    </div>
  );
}

export default EventInterface;
