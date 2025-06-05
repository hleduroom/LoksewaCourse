"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("Nepal");
  const [subscribe, setSubscribe] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-br from-purple-100 via-white to-purple-200 text-gray-900 md:grid-cols-2 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Right Section */}
      <div className="order-1 flex flex-col bg-white p-6 shadow-xl md:order-2 md:p-10 dark:bg-gray-900">
        <div className="mb-4 text-right text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-purple-600 hover:underline">
            Sign in →
          </Link>
        </div>

        <h2 className="mb-6 text-2xl font-semibold">Sign up to loksewa</h2>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name*</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email*</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password*</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Password"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Password must be 8+ characters with a number and a lowercase
              letter.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Your Country/Region*
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-md border px-4 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option>Nepal</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Australia</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={() => setSubscribe(!subscribe)}
              className="accent-purple-600"
            />
            <label className="text-sm">Receive updates and announcements</label>
          </div>

          <Button className="w-full">Sign Up</Button>
        </form>
      </div>

      {/* Left Section  */}
      <div className="animate-gradient-slow bg-size-200 bg-pos-0 hidden flex-col items-center bg-gradient-to-br from-purple-100 via-white to-purple-200 p-6 md:flex md:p-10 dark:bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-gray-800">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Create your free account
        </h1>
        <p className="max-w-sm text-center text-sm text-gray-600 dark:text-gray-300">
          Explore all video, quiz, and resources.
        </p>
        <div className="mt-6 w-full max-w-xs">
          <img
            src="/signin.svg"
            alt="Floating mascot"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
