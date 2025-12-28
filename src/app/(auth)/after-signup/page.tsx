"use client";
import React from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

function AfterSignPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  useEffect(() => {
    if (!user || !isLoaded) return;
    const isOrganizer = JSON.parse(
      localStorage.getItem("organizer") || "false"
    );
    const setup = async () => {
      if (isOrganizer) {
        await fetch("/api/set-role/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            isOrganizer: true,
          }),
        });
      }
      localStorage.removeItem("organizer");
      await signOut({ redirectUrl: "/" });
    };

    setup();
  }, [user, isLoaded, signOut]);
  return (
    <div>
      <p>Authenticating and creating session for you .... Be Patient</p>
    </div>
  );
}

export default AfterSignPage;
