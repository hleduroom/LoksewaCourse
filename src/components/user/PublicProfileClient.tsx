"use client";

import { useState } from "react";

import AccountSecurityTab from "./AccountSecurityTab";
import DeleteAccountTab from "./DeleteAccountTab";
import PaymentMethodsTab from "./PaymentMethodsTab";
import PrivacyTab from "./PrivacyTab";
import ProfileTab from "./ProfileTab";

interface PublicProfileClientProps {
  session: {
    user?: {
      name?: string;
      email?: string;
    };
  } | null;
}

export default function PublicProfileClient({
  session,
}: PublicProfileClientProps) {
  const [activeTab, setActiveTab] = useState("Profile");

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "ST";

  const sidebarItems = [
    "Profile",
    "Account Security",
    "Payment methods",
    "Privacy",
    "Delete account",
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab session={session} />;
      case "Account Security":
        return <AccountSecurityTab />;
      case "Payment methods":
        return <PaymentMethodsTab />;
      case "Privacy":
        return <PrivacyTab />;
      case "Delete account":
        return <DeleteAccountTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col items-center border-b border-gray-200 bg-gray-50 py-6 lg:hidden dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Hi, {session?.user?.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {session?.user?.email}
          </span>
        </div>
      </div>

      <div className="flex min-h-screen flex-col overflow-hidden lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full flex-shrink-0 border-b border-gray-200 bg-gray-50 lg:w-64 lg:border-r lg:border-b-0 dark:border-gray-800 dark:bg-gray-950">
          <nav className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3 lg:flex-col lg:p-6">
            <div className="hidden flex-col items-center border-b border-gray-200 bg-gray-50 py-6 lg:flex dark:border-gray-800 dark:bg-gray-950">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
                {initials}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Hi, {session?.user?.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {session?.user?.email}
                </span>
              </div>
            </div>

            {sidebarItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm font-medium transition ${
                  activeTab === item
                    ? "bg-purple-200 text-purple-900 dark:bg-purple-700 dark:text-white"
                    : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <h1 className="mb-1 text-xl font-bold sm:text-2xl">{activeTab}</h1>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Manage your {activeTab.toLowerCase()}
          </p>

          {renderTab()}
        </main>
      </div>
    </div>
  );
}
