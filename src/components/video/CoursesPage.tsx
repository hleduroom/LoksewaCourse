"use client";
import { useEffect, useState } from "react";
import CourseGrid from "./CourseGrid";
import FilterSidebar from "./FilterSidebar";
import { getCoursesByServiceId } from "@/modules/admin/courses/action";

const SERVICES = [
  "Engineering",
  "PSC",
  "Nepal Army",
  "Nepal Police",
  "Nepal Health Services",
];

interface CoursePageProps {
  serviceId: string;
}

export default function CoursesPage({ serviceId }: CoursePageProps) {
  const [course, setCourse] = useState<any[]>([]);
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
    const price = Number(course?.price ?? "0");
    const rating = Number(course?.rating ?? "0");
    const serviceTitle = course?.serviceTitle?.toLowerCase() || "";

    if (filters.price.size > 0) {
      const isFree = price === 0;

      if (
        (isFree && !filters.price.has("Free")) ||
        (!isFree && !filters.price.has("Paid"))
      ) {
        return false;
      }
    }

    if (filters.rating.size > 0) {
      const passes = [...filters.rating].some(
        (r) => rating >= parseFloat(r)
      );
      if (!passes) return false;
    }

    if (filters.services.size > 0) {
      const passes = [...filters.services].some((selected) =>
        serviceTitle.includes(selected.toLowerCase())
      );
      if (!passes) return false;
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
