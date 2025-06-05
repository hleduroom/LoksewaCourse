"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BookOpen, LogOut, Settings, User } from "lucide-react";

import { signOut } from "@/lib/auth-client";

export default function Rightnav({
  userInitials = "ST",
  userName = "Santosh Tiwari",
  role = "user"
}: {
  userInitials?: string;
  userName?: string;
  role?: string
}) {
  const [showExplore, setShowExplore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  let hoverTimeout: NodeJS.Timeout;

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(hoverTimeout);
      setShowExplore(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      hoverTimeout = setTimeout(() => {
        setShowExplore(false);
      }, 200);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setShowExplore((prev) => !prev);
    }
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

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-end px-6">
      <div className="flex items-center gap-4">
        {role !== "admin" ? (<button
          onClick={() => router.push("/student/mylearning")}
          className="cursor-pointer bg-white px-1 py-2 text-sm font-medium text-gray-800 transition hover:text-purple-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:text-purple-400"
        >
          My Learning
        </button>) : (<button
          onClick={() => router.push("/admin")}
          className="cursor-pointer bg-white px-1 py-2 text-sm font-medium text-gray-800 transition hover:text-purple-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:text-purple-400"
        >
          Admin Panel
        </button>)}


        <div
          className="relative"
          ref={exploreRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button onClick={handleClick}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-lg font-bold text-white dark:bg-gray-700">
              {userInitials}
            </div>
          </button>

          <div
            className={`absolute top-full left-1/2 z-50 mx-auto mt-3 w-64 max-w-[calc(100vw-2rem)] origin-top -translate-x-1/2 transform rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${showExplore
              ? "visible scale-100 opacity-100"
              : "invisible scale-95 opacity-0"
              }`}
          >
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/student/profile"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-purple-400"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/student/profile"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-purple-400"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </li>
              <li>
                {role !== "admin" ? (<Link
                  href="/student/mylearning"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-purple-400"
                >
                  <BookOpen className="h-4 w-4" />
                  My Learnings
                </Link>) : (<Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-purple-400"
                >
                  <BookOpen className="h-4 w-4" />
                  Admin Pannel
                </Link>)}

              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-purple-400"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
