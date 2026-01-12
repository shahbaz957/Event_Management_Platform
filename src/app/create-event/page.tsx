"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface FormState {
  org_id: string;
  title: string;
  desc: string;
  total_seats: string | number;
  designation: string;
  location: string;
  date: string;
  st_time: string;
  end_time: string;
  image: File | null;
}

function CreateEvent() {
  const [form, setForm] = useState<FormState>({
    org_id: "",
    title: "",
    desc: "",
    total_seats: 0,
    designation: "",
    location: "",
    date: "",
    st_time: "",
    end_time: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const updatedValue =
      type === "number" ? (value === "" ? 0 : Number(value)) : value;
    setForm({ ...form, [name]: updatedValue });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.[0]) {
      setForm({ ...form, image: e.target?.files?.[0] });
    }
  };
  const { user } = useUser();
  //   console.log(user?.id)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      for (const key in form) {
        if (key == "image") continue;
        formData.append(key, form[key].toString());
      }
      if (form.image) {
        formData.append("image", form.image);
      }
      if (user?.id) {
        formData.append("org_id", user?.id);
      }
      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Something Went Wrong");
        return;
      }
      alert("Event created successfully");
    } catch (error) {
      console.log("Error occured : ", error);
      alert("Network Error Occured. Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-white">Create Event</h1>
        <p className="text-zinc-400 text-sm">
          Fill in the details to publish your event
        </p>

        {/* Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
            Event Image
          </label>

          <label
            htmlFor="image"
            className="group relative flex flex-col items-center justify-center
      h-52 w-full cursor-pointer rounded-xl
      border-2 border-dashed border-zinc-700
      bg-zinc-950/50
      transition hover:border-indigo-500 hover:bg-zinc-900"
          >
            <Upload className="h-10 w-10 text-zinc-500 group-hover:text-indigo-400 transition" />

            <p className="mt-3 text-sm text-zinc-400">
              Click to upload or drag & drop
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              PNG, JPG, JPEG up to 5MB
            </p>

            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              name="image"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Tech Conference 2025"
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800
              px-4 py-2 text-zinc-200 placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
            Description
          </label>
          <textarea
            name="desc"
            placeholder="Describe your event..."
            rows={4}
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800
              px-4 py-2 text-zinc-200 placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={form.desc}
            onChange={handleChange}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
              Total Seats
            </label>
            <input
              name="total_seats"
              type="number"
              placeholder="100"
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800
                px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500 transition"
              value={form.total_seats}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
              Designation
            </label>
            <input
              name="designation"
              type="text"
              placeholder="Event Organizer, CEO, Entrepreneur"
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800
                px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500 transition"
              value={form.designation}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
            Location
          </label>
          <input
            name="location"
            type="text"
            placeholder="New York, USA"
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800
              px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500 transition"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
              Date
            </label>
            <input
              name="date"
              type="date"
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800
                px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500 transition"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
              Start Time
            </label>
            <input
              name="st_time"
              type="time"
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800
                px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500 transition"
              value={form.st_time}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium uppercase text-zinc-400 tracking-wide">
              End Time
            </label>
            <input
              name="end_time"
              type="time"
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800
                px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500 transition"
              value={form.end_time}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 flex items-center justify-center gap-2
    bg-indigo-600 hover:bg-indigo-500
    text-white font-medium py-2.5 rounded-lg
    transition duration-200
    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Creating...
            </>
          ) : (
            "Create Event"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
