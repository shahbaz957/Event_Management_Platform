"use client";
import React, { useState } from "react";
import { SignUp } from "@clerk/nextjs";
import { Suspense, useEffect } from "react";

function SignUpPage() {
  const [isOrganizer, setIsOrganizer] = useState(false);

  useEffect(() => {
    localStorage.setItem("organizer", JSON.stringify(isOrganizer));
  }, [isOrganizer]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
      <div className="max-w-md w-full mx-4">

        <div className="bg-white p-4 rounded-t-xl shadow-lg border-b border-gray-200">
          <label 
            htmlFor="role" 
            className="flex items-start space-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              name="role"
              id="role"
              checked={isOrganizer}
              onChange={(e) => setIsOrganizer(e.target.checked)}
              className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex-1">
              <span className="text-sm font-semibold text-gray-900 block">
                Sign up as an Event Organizer
              </span>
              <span className="text-xs text-gray-600 mt-1 block">
                Create and manage events, track analytics, and reach more attendees
              </span>
            </div>
          </label>
        </div>

        <Suspense fallback={
          <div className="bg-white p-8 rounded-b-xl shadow-lg flex items-center justify-center h-96">
            <div className="text-gray-600">Loading...</div>
          </div>
        }>
          <SignUp
            routing="path"
            path="/sign-up"
            fallbackRedirectUrl="/after-signup"
            signInUrl="/sign-in"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-lg rounded-t-none rounded-b-xl",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                footerActionLink: "text-blue-600 hover:text-blue-700"
              }
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default SignUpPage;