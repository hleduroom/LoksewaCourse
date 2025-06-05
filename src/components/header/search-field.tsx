"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses..."
        className="w-150 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-black focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      />
    </form>
  );
}
