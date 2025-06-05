"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      const encoded = encodeURIComponent(query.trim());
      router.push(`/courses/search/?q=${encoded}`);
    }
  };

  return (
    <main className="flex h-full flex-col items-center justify-start bg-white px-4 pt-4 pb-2 md:pt-16 md:pb-0 dark:bg-gray-900">
      <h1 className="mb-3 text-center text-lg font-bold text-gray-800 sm:text-xl md:mb-6 md:text-4xl dark:text-white">
        Get All Online Courses For Your Loksewa Journey
      </h1>

      <div className="mb-5 w-full max-w-xl">
        <div className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-800">
          <span className="mr-1 text-lg text-gray-400 dark:text-gray-300">
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What do you want to learn today?"
            className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-white dark:placeholder-gray-500"
          />
        </div>
      </div>

      <div className="mt-4 w-full max-w-6xl md:mt-10">
        <img
          src="/banner-image.svg"
          alt="Illustration"
          className="h-auto w-full"
        />
      </div>
      <div className="pointer-events-none absolute -top-20 -left-32 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 opacity-50 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-400/10 opacity-30 blur-2xl dark:bg-blue-400/5" />
    </main>
  );
}
