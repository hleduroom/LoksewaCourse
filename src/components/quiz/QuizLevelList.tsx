"use client";

import { useRouter } from "next/navigation";

const emojiMap: Record<string, string> = {
  kharidar: "🗂️",
  "nayab subba": "📋",
  officer: "🎖️",
  "computer officer": "💻",
  "computer operator": "🖥️",
  asi: "👮‍♂️",
  inspector: "🕵️",
  "officer cadet": "🪖",
  "written exam": "📝",
  "civil engineering": "🏗️",
  "computer engineering": "🧠",
  "civil sub engineering": "📐",
  "primary level teaching license": "📚",
  "primary level teacher service": "🧑‍🏫",
  "sec level teaching license": "🎓",
  "pharmacy assistant": "💊",
  "lab assistant": "🧪",
  "general aayurveda": "🌿",
  "nepal bank limited": "🏦",
  "rastriya banijya bank": "💰",
  "nepal rastra bank": "💳",
};

interface QuizLevelListProps {
  serviceName: string;
  levels: string[];
}

export default function QuizLevelList({
  serviceName,
  levels,
}: QuizLevelListProps) {
  const router = useRouter();

  const handleLevelClick = (level: string) => {
    const levelSlug = level.toLowerCase().replace(/\s+/g, "-");
    router.push(
      `/services/${encodeURIComponent(serviceName)}/quiz/${levelSlug}`
    );
  };

  if (levels.length === 0) {
    return (
      <p className="text-center text-lg text-red-500 dark:text-red-400">
        No levels available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {levels.map((level) => {
        const emoji = emojiMap[level.toLowerCase()] || "🎯";
        return (
          <div
            key={level}
            onClick={() => handleLevelClick(level)}
            className="group transform cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow transition-transform hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 text-center text-4xl transition-transform group-hover:scale-110">
              {emoji}
            </div>
            <h3 className="text-center text-xl font-semibold text-gray-800 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {level}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
