"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BookOpen } from "lucide-react";

export default function MobileProfileMenu({
  userInitials = "ST",
  userName = "Santosh Tiwari",
  email = "",
}: {
  userInitials?: string;
  userName?: string;
  email?: string;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleProfile = () => {
    router.push("/student/profile");
  };
  return (
    <div className="px-4 lg:hidden">
      <div
        className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-800"
        onClick={handleProfile}
      >
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-lg font-bold text-white">
            {userInitials}
          </div>
          <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-fuchsia-600 ring-2 ring-white dark:ring-gray-900" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Hi, {userName}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </div>

        <svg
          className="ml-auto h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <div className="mt-4">
        <span className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
          Learn
        </span>
        <button
          onClick={() => {
            router.push("/student/mylearning");
          }}
          className="mt-4 flex w-full items-center gap-2 text-left text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
        >
          <BookOpen className="h-5 w-5 text-purple-600" />
          My learning
        </button>
      </div>
    </div>
  );
}
