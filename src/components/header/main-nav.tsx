"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Book } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Book className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/courses"
          className={cn(
            "hover:text-foreground/80 transition-colors",
            pathname === "/courses" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Courses
        </Link>
      </nav>
    </div>
  );
}
