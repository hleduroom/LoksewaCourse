"use client";

import CourseCard from "./CourseCard";

export default function CourseGridMyLearning({ courses }: { courses: any[] }) {
    return (
        <main className="flex-grow dark:bg-gray-900">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {courses?.map((course) => (
                    <CourseCard key={course?.id} course={course} />
                ))}
                {courses.length === 0 && (
                    <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                        No matching courses found.
                    </p>
                )}
            </div>
        </main>
    );
}
