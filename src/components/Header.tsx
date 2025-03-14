"use client";

import { useState, useEffect } from "react";
import { Bell, User } from "lucide-react";

export function Header() {
  const [username] = useState("Admin");
  const [notifications] = useState(3);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  // Check for dark mode preference on moun

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="md:hidden w-8"></div>

        <div className="flex-1 px-4 md:text-center md:px-0 lg:px-0 lg:text-left">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
            {formattedDate}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs font-bold rounded-full bg-red-500 text-white">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
