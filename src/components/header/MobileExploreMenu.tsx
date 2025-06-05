"use client";

import Link from "next/link";
import { IconRenderer } from "./icon-renderer";

type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};



export default function MobileExploreMenu({ services }) {
  return (
    <div className="text-left">
      <span className="block p-4 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
        Explore
      </span>
      <ul className="space-y-2">
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
      </ul>
    </div>
  );
}
