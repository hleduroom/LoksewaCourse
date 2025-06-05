"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

export default function CourseGrid({ courses }: { courses: any[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    // If data arrives (i.e., non-empty), stop loading immediately
    if (courses.length > 0) {
      setIsLoading(false);
      setShowNotFound(false);
      return;
    }

    // Still empty, start timers
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setShowNotFound(true);
    }, 10000); // max 10 seconds loading

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [courses]);

  return (
    <main className="flex-grow dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[360px] animate-pulse rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 space-y-3 shadow-sm"
            >
              <div className="h-[170px] w-full rounded-md bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="h-3 w-1/2 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600 mt-auto" />
            </div>
          ))
          : courses?.map((course) => (
            <CourseCard key={course?.id} course={course} />
          ))}
        {!isLoading && courses.length === 0 && showNotFound && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No matching courses found.
          </p>
        )}
      </div>
    </main>
  );
}
