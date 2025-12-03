"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Settings,
  User,
  LogOut,
  HelpCircle,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Critical Incident",
      message: "Fire alarm triggered in Building A",
      time: "2 min ago",
      type: "critical",
    },
    {
      id: 2,
      title: "Maintenance Completed",
      message: "Elevator repair in Lobby finished",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 3,
      title: "New Resident Request",
      message: "Parking permit application from Apt 502",
      time: "3 hours ago",
      type: "info",
    },
  ];

  return (
    <header className="h-16 bg-[var(--surface)] border-b border-[var(--border-subtle)] flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground-subtle)]" />
          <input
            type="text"
            placeholder="Search incidents, residents, reports..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--background)] border border-[var(--border-subtle)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-[var(--foreground-subtle)] bg-[var(--surface-elevated)] rounded border border-[var(--border-subtle)]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 ml-6">
        {/* Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 live-indicator"></span>
          <span className="text-sm font-medium text-emerald-400">
            All Systems Operational
          </span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative w-10 h-10 rounded-xl bg-[var(--background)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center transition-colors"
          >
            <Bell className="w-5 h-5 text-[var(--foreground-muted)]" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <h3 className="font-semibold text-[var(--foreground)]">
                  Notifications
                </h3>
                <button className="text-sm text-indigo-400 hover:text-indigo-300">
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-3 hover:bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] last:border-0 cursor-pointer transition-colors"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                          notif.type === "critical"
                            ? "bg-red-500"
                            : notif.type === "success"
                            ? "bg-emerald-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">
                          {notif.title}
                        </p>
                        <p className="text-sm text-[var(--foreground-muted)]">
                          {notif.message}
                        </p>
                        <p className="text-xs text-[var(--foreground-subtle)] mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-[var(--surface-elevated)] text-center">
                <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-[var(--background)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
              JD
            </div>
            <span className="hidden sm:block text-sm font-medium text-[var(--foreground)]">
              John
            </span>
            <ChevronDown className="w-4 h-4 text-[var(--foreground-muted)]" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
                <p className="font-medium text-[var(--foreground)]">John Doe</p>
                <p className="text-sm text-[var(--foreground-muted)]">
                  john@residex.com
                </p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)] flex items-center gap-3 transition-colors">
                  <User className="w-4 h-4" />
                  Profile Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)] flex items-center gap-3 transition-colors">
                  <Settings className="w-4 h-4" />
                  Preferences
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)] flex items-center gap-3 transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </button>
              </div>
              <div className="border-t border-[var(--border-subtle)] py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
