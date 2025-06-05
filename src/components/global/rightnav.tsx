"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Rightnav({
  userInitials = "ST",
  userName = "Santosh Tiwari",
}: {
  userInitials?: string;
  userName?: string;
}) {
  const [showExplore, setShowExplore] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setShowExplore(true);
  };

  const handleMouseLeave = () => {
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <div
          className="relative"
          ref={exploreRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="text-sm font-medium transition hover:text-purple-600"
            onClick={() => setShowExplore((prev) => !prev)}
          >
            {userInitials || "ST"}
          </button>

          <div
            className={`absolute top-full left-0 z-50 mt-2 w-64 origin-top transform rounded-md border bg-white p-4 shadow-lg transition-all duration-300 ease-in-out ${
              showExplore
                ? "visible scale-100 opacity-100"
                : "invisible scale-95 opacity-0"
            }`}
          >
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/Account" className="hover:text-purple-600">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/Settings" className="hover:text-purple-600">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/Learnings" className="hover:text-purple-600">
                  My Learnings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
