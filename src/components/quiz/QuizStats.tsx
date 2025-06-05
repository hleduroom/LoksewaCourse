import React from "react";

import { QuizMeta } from "@/data/mock";

type Props = {
  quizData: QuizMeta[];
};

const QuizStats: React.FC<Props> = ({ quizData }) => {
  let easy = 0,
    medium = 0,
    hard = 0;
  const total = quizData.length;

  quizData.forEach((q) => {
    const level = q.difficulty?.toLowerCase();
    if (level === "easy") easy++;
    else if (level === "medium") medium++;
    else hard++;
  });

  return (
    <div className="flex w-full items-center justify-between bg-white p-6 text-gray-900 shadow-lg transition-colors duration-300 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-900 dark:text-white">
      <div>
        <h2 className="mb-2 text-3xl font-bold">Quizzes</h2>

        <div className="mb-4 flex items-center gap-2">
          <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(total / total) * 100}%` }}
            />
          </div>
          <span className="text-lg font-semibold">
            {total}/{total} Quizzes
          </span>
        </div>

        <div className="flex gap-8">
          <div>
            <p className="text-2xl font-bold">{easy}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Easy Quizzes
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">{medium}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Medium Quizzes
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">{hard}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Hard Quizzes
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="animate-pulse rounded-full bg-green-400/10 p-6 dark:bg-green-400/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-28 w-28 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12l5 5L20 7"
            />
          </svg>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-20 -left-32 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 opacity-50 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-400/10 opacity-30 blur-2xl dark:bg-blue-400/5" />
    </div>
  );
};

export default QuizStats;
