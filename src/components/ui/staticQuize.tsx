"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";

import { quizData } from "@/data/quiz";

const difficulties = [
  { level: "easy", label: "🟢 Easy", color: "bg-green-100 dark:bg-green-800" },
  {
    level: "medium",
    label: "🟠 Medium",
    color: "bg-yellow-100 dark:bg-yellow-800",
  },
  {
    level: "complex",
    label: "🔴 Complex",
    color: "bg-red-100 dark:bg-red-800",
  },
];

export default function LevelDifficultyPage() {
  const { topic, level } = useParams();
  console.log(topic, level);
  const router = useRouter();

  const service = decodeURIComponent(topic as string).toLowerCase();
  const levell = decodeURIComponent(level as string);

  const quizSet = quizData[service]?.[levell];

  const handleStart = (difficulty: string) => {
    const url = `/services/${service}/quiz/${level}/${difficulty}`;
    window.open(url, "_blank");
  };

  if (!quizSet) {
    return (
      <p className="mt-20 text-center text-red-500">
        No quiz data found for this level.
      </p>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-gray-100 p-6 dark:bg-gray-900">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">
        Select Difficulty for {level}
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {difficulties.map(({ level: difficulty, label, color }) => (
          <div
            key={difficulty}
            className={`transform cursor-pointer rounded-xl border p-6 shadow-lg transition hover:scale-105 dark:border-gray-700 ${color}`}
            onClick={() => handleStart(difficulty)}
          >
            <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
              {label}
            </h2>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
              {quizSet[difficulty].length} questions
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
