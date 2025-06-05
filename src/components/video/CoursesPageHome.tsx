"use client";

import { useEffect, useState } from "react";

import CourseGrid from "./CourseGrid";
import FilterSidebar from "./FilterSidebar";
import { getPublishedCourses } from "@/modules/admin/courses/action";

const SERVICES = [
    "Engineering",
    "PSC",
    "Nepal Army",
    "Nepal Police",
    "Nepal Health Services",
];

export default function CoursePageHome() {
    const [course, setCourse] = useState<any[]>([]);
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courses = await getPublishedCourses();
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


    const [filters, setFilters] = useState({
        price: new Set<string>(),
        rating: new Set<string>(),
        services: new Set<string>(),
    });

    const toggleFilter = (type: keyof typeof filters, value: string) => {
        setFilters((prev) => {
            const newSet = new Set(prev[type]);
            newSet.has(value) ? newSet.delete(value) : newSet.add(value);
            return { ...prev, [type]: newSet };
        });
    };
    const filteredCourses = course.filter((course) => {
        if (filters.price.size > 0) {
            const isFree = course?.price === 0;
            if (filters.price.has("Free") && !isFree && !filters.price.has("Paid")) {
                return false;
            }
            if (filters.price.has("Paid") && isFree && !filters.price.has("Free")) {
                return false;
            }
            if (!filters.price.has("Free") && !filters.price.has("Paid")) {
                return false;
            }
        }

        // RATING
        if (filters.rating.size > 0) {
            const pass = [...filters.rating].some(
                (rating) => course?.rating >= parseFloat(rating)
            );
            if (!pass) return false;
        }

        // SERVICES
        if (filters.services.size > 0) {
            const match = [...filters.services].some((service) =>
                course?.title.toLowerCase().includes(service.toLowerCase())
            );
            if (!match) return false;
        }

        return true;
    });

    return (
        <div className="flex gap-6 px-6 py-6 dark:bg-gray-900">
            <FilterSidebar
                filters={filters}
                toggleFilter={toggleFilter}
                services={SERVICES}
            />
            <CourseGrid courses={filteredCourses} />
        </div>
    );
}