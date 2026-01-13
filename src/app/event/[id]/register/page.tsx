"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Plus,
  Minus,
  Loader2,
  Ticket,
  Users,
} from "lucide-react";

function Register() {
  const { id } = useParams();
  const { user } = useUser();

  const [event, setEvent] = useState<any>(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInc = () => {
    if (count < event.rem_seats) setCount((p) => p + 1);
  };

  const handleDec = () => {
    if (count > 0) setCount((p) => p - 1);
  };

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch {
        setError("Failed to load event");
      }
    }
    loadEvent();
  }, [id]);

  const handleRegister = async () => {
    if (count === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seatsBooked: count , userId : user?.id }),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok) setError(data.message || "Registration failed");
      else alert("🎉 Registration successful!");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="flex items-center justify-center h-60">
        <Loader2 className="animate-spin w-6 h-6 text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-2xl
      bg-zinc-950 border border-indigo-500/20
      shadow-[0_0_30px_rgba(99,102,241,0.35)]
      space-y-6">

      {/* Header */}
      <div className="text-center space-y-2">
        <Ticket className="mx-auto w-9 h-9 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.9)]" />
        <h1 className="text-2xl font-semibold text-white">
          Register for Event
        </h1>
        <p className="text-indigo-300 flex items-center justify-center gap-2">
          <Users className="w-4 h-4" />
          {event.rem_seats} seats available
        </p>
      </div>

      {/* Seat Selector */}
      <div className="flex items-center justify-center gap-6">

        <button
          onClick={handleDec}
          disabled={count === 0}
          className="p-3 rounded-full bg-zinc-900
          border border-indigo-500/30
          hover:shadow-[0_0_12px_rgba(99,102,241,0.8)]
          disabled:opacity-40 transition"
        >
          <Minus className="text-indigo-300" />
        </button>

        <span
          className="text-3xl font-bold w-14 text-center text-white
          rounded-full py-2
          bg-zinc-900 border border-indigo-500/40
          shadow-[0_0_15px_rgba(99,102,241,0.9)]"
        >
          {count}
        </span>

        <button
          onClick={handleInc}
          disabled={count >= event.rem_seats}
          className="p-3 rounded-full bg-zinc-900
          border border-indigo-500/30
          hover:shadow-[0_0_12px_rgba(99,102,241,0.8)]
          disabled:opacity-40 transition"
        >
          <Plus className="text-indigo-300" />
        </button>

      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 text-center">
          {error}
        </p>
      )}

      {/* Register Button */}
      <button
        onClick={handleRegister}
        disabled={loading || count === 0}
        className="w-full py-3 rounded-xl font-medium text-white
        bg-gradient-to-r from-indigo-500 to-violet-600
        shadow-[0_0_25px_rgba(139,92,246,0.9)]
        hover:shadow-[0_0_40px_rgba(139,92,246,1)]
        transition disabled:opacity-50
        flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            Processing...
          </>
        ) : (
          "Register Now"
        )}
      </button>
    </div>
  );
}

export default Register;
