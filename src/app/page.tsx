"use client"
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
export default function Home() {
  const {user} = useUser();
  const fullName = user?.fullName;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black text-4xl text-amber-500">
      Mirza Shahbaz Ali Baig is a very Good Boy
      <br />
      <h1>{fullName}</h1>
    </div>
  );
}
