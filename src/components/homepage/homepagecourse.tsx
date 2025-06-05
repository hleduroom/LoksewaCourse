"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getServices } from "@/modules/admin/services/action";
import { useEffect, useState } from "react";
import { IconRenderer } from "../header/icon-renderer";

export default function CategoryGrid() {
  const router = useRouter();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchCourse = async () => {
      try {
        const data = await getServices();
        if (Array.isArray(data)) {
          setServices(data);
          setLoading(false);
        } else {
          console.error("Service is not an array", data);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchCourse();

    timeoutId = setTimeout(() => {
      if (services.length === 0) {
        setLoading(false);
        setTimeoutReached(true);
      }
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClick = (id: string) => {
    router.push(`/services/${id}`);
  };

  const SkeletonCard = () => (
    <div className="animate-pulse rounded-xl bg-gray-100 p-6 dark:bg-gray-800">
      <div className="mb-4 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto" />
      <div className="h-4 w-2/3 mx-auto mb-2 rounded bg-gray-300 dark:bg-gray-600" />
      <div className="h-3 w-1/2 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );

  return (
    <section className="bg-white px-4 py-12 text-gray-900 md:pt-10 dark:bg-gray-900 dark:text-white">
      <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
        Explore 500+ Online Courses
      </h2>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {loading &&
          Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!loading && timeoutReached && services.length === 0 && (
          <p className="col-span-full text-center text-lg font-semibold text-red-500">
            Services not found 😕
          </p>
        )}

        {!loading &&
          services.length > 0 &&
          services.map((cat, i) => (
            <motion.div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex cursor-pointer flex-col items-center rounded-xl bg-gray-100 p-6 text-center text-gray-800 shadow transition-all hover:shadow-lg dark:bg-gray-800 dark:text-white"
            >
              <IconRenderer name={cat?.icon} />
              <h3 className="text-lg font-semibold">{cat?.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {cat?.courses?.toLocaleString()} Courses →
              </p>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
