"use client";

import Link from "next/link";
import { JSX, useState } from "react";

import {
  Banknote,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";

type MenuItem = {
  key: string;
  label: string;
  icon: JSX.Element;
  submenu?: { label: string; href: string }[];
  href?: string;
};

const menuItems: MenuItem[] = [
  {
    key: "psc",
    label: "Public Service Commission",
    icon: <ShieldCheck className="h-5 w-5 text-purple-600" />,
    submenu: [
      { label: "Overview", href: "/courses/psc-overview" },
      { label: "PSC Exams", href: "/courses/psc-exams" },
    ],
  },
  {
    key: "engineering",
    label: "Engineering",
    icon: <Cpu className="h-5 w-5 text-purple-600" />,
    submenu: [
      { label: "Civil Engineering", href: "/courses/civil" },
      { label: "Computer Engineering", href: "/courses/computer" },
    ],
  },
  {
    key: "banking",
    label: "Banking",
    icon: <Banknote className="h-5 w-5 text-purple-600" />,
    submenu: [
      { label: "Nepal Bank", href: "/courses/nepal-bank" },
      { label: "Rastriya Banijya Bank", href: "/courses/rbb" },
    ],
  },
  {
    key: "police",
    label: "Nepal Police",
    icon: <Users className="h-5 w-5 text-purple-600" />,
    submenu: [
      { label: "ASI", href: "/courses/asi" },
      { label: "Inspector", href: "/courses/inspector" },
    ],
  },
  {
    key: "tsc",
    label: "Teacher Commission",
    icon: <GraduationCap className="h-5 w-5 text-purple-600" />,
    submenu: [
      { label: "Teaching License", href: "/courses/teaching-license" },
      { label: "Primary Teacher", href: "/courses/primary-teacher" },
    ],
  },
  {
    key: "nhs",
    label: "Nepal Health Service",
    icon: <BookOpen className="h-5 w-5 text-purple-600" />,
    submenu: [
      { label: "Pharmacy Assistant", href: "/courses/pharmacy" },
      { label: "Lab Assistant", href: "/courses/lab-assistant" },
    ],
  },
  // Example of a direct link item without submenu
  {
    key: "about",
    label: "About Us",
    icon: <BookOpen className="h-5 w-5 text-purple-600" />,
    href: "/about",
  },
];

export default function MobileExploreMenu() {
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSub = (key: string) => {
    setOpenSub((prev) => (prev === key ? null : key));
  };

  return (
    <div className="text-left">
      <h2 className="mb-2 text-lg font-semibold">Explore</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleSub(item.key)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  {openSub === item.key ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openSub === item.key && (
                  <ul className="mt-1 space-y-1 pl-6 text-sm text-gray-600 dark:text-gray-300">
                    {item.submenu.map((sub, idx) => (
                      <li key={idx}>
                        <Link href={sub.href} className="block hover:underline">
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : item.href ? (
              <Link
                href={item.href}
                className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.icon}
                {item.label}
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
