"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconRenderer } from "./icon-renderer";

import SearchForm from "./search-field";


export default function Leftnav({ services }) {
  const [showExplore, setShowExplore] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  let hoverTimeout: NodeJS.Timeout;

  const handleExploreEnter = () => {
    clearTimeout(hoverTimeout);
    setShowExplore(true);
  };

  const handleExploreLeave = () => {
    hoverTimeout = setTimeout(() => {
      setShowExplore(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exploreRef.current &&
        !exploreRef.current.contains(event.target as Node)
      ) {
        setShowExplore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-2xl font-bold text-black dark:text-white"
        >
          Loksewa
        </Link>

        <div
          className="relative"
          ref={exploreRef}
          onMouseEnter={handleExploreEnter}
          onMouseLeave={handleExploreLeave}
        >
          <button className="text-sm font-medium transition hover:text-purple-600 dark:text-white">
            Explore
          </button>

          <div
            className={`absolute top-full left-0 z-50 mt-2 w-[500px] rounded-md border border-gray-200 bg-white shadow-2xl transition-all duration-200 dark:border-gray-700 dark:bg-gray-900 ${showExplore ? "visible opacity-100" : "invisible opacity-0"
              }`}
          >
            <div className="grid grid-cols-2 gap-4 p-4">
              {services?.map((item, i) => (
                <Link
                  key={i}
                  href={`/services/${(item?.id)}`}
                  className="flex items-center space-x-3 rounded-md px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <IconRenderer name={item.icon} />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item?.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <SearchForm />
      </div>
    </div>
  );
}
