"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import CourseGrid from "@/components/video/CourseGrid";
import FilterSidebar from "@/components/video/FilterSidebar";

import { courses as allCourses } from "@/data/videos";

const SERVICES = [
  "Engineering",
  "PSC",
  "Nepal Army",
  "Nepal Police",
  "Nepal Health Services",
];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  console.log(query);
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
  const filteredCourses = allCourses.filter((course) => {
    const lowerQuery = query.toLowerCase();

    // TEXT SEARCH FILTER
    if (
      query &&
      !(
        course.title?.toLowerCase().includes(lowerQuery) ||
        course.description?.toLowerCase().includes(lowerQuery) ||
        course.tutor?.name.toLowerCase().includes(lowerQuery) ||
        course.slug?.toLowerCase().includes(lowerQuery) ||
        course.services?.toLowerCase().includes(lowerQuery)
      )
    ) {
      return false;
    }
    // PRICE FILTER
    if (filters.price.size > 0) {
      const isFree = course.price === "Free";
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

    // RATING FILTER
    if (filters.rating.size > 0) {
      const pass = [...filters.rating].some(
        (rating) => course.rating >= parseFloat(rating)
      );
      if (!pass) return false;
    }

    // SERVICES FILTER
    if (filters.services.size > 0) {
      const match = [...filters.services].some((service) =>
        course.title.toLowerCase().includes(service.toLowerCase())
      );
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="flex gap-6 px-6 py-6">
      <FilterSidebar
        filters={filters}
        toggleFilter={toggleFilter}
        services={SERVICES}
      />
      <CourseGrid courses={filteredCourses} />
    </div>
  );
}
