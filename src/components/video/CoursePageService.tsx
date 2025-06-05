"use client";

import { useEffect, useState } from "react";
import { getCoursesByServiceId } from "@/modules/admin/courses/action";
import CourseCard from "./CourseCard";

interface CoursePageProps {
    serviceId: string;
}

export default function CoursesPageService({ serviceId }: CoursePageProps) {
    const [courses, setCourse] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showNotFound, setShowNotFound] = useState(false);


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courses = await getCoursesByServiceId(serviceId);
                if (!Array.isArray(courses)) {
                    console.error("courses is not an array", courses);
                    return;
                }
                setCourse(courses);
            } catch (err) {
                console.error("Error fetching chapter:", err);
            }
        };

        fetchCourse();
    }, []);

    useEffect(() => {
        if (courses.length > 0) {
            setIsLoading(false);
            setShowNotFound(false);
            return;
        }

        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
            setShowNotFound(true);
        }, 10000);

        return () => {
            clearTimeout(loadingTimeout);
        };
    }, [courses]);

    return (
        <main className="p-5 flex-grow dark:bg-gray-900">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
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
                    ))

                }
                {!isLoading && courses.length === 0 && showNotFound && (
                    <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                        No matching courses found.
                    </p>
                )}
            </div>
        </main>
    );
}
