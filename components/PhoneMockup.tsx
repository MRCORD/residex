"use client";

import { useState, useEffect } from "react";
import {
  Smartphone,
  Wifi,
  Battery,
  Signal,
  Send,
  ChevronRight,
  X,
  Bell,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Clock,
} from "lucide-react";
import { submitIncident, getTenantNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/app/actions";
import { type Notification } from "@/lib/data/notifications";

export default function PhoneMockup() {
  const [isOpen, setIsOpen] = useState(true);
  const [view, setView] = useState<"form" | "notifications">("form");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications
  useEffect(() => {
    loadNotifications();
    // Poll for new notifications every 2 seconds
    const interval = setInterval(loadNotifications, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    const notifs = await getTenantNotifications();
    setNotifications(notifs);
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  const handleMarkAsRead = async (id: number) => {
    await markNotificationAsRead(id);
    loadNotifications();
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
    loadNotifications();
  };

  return (
    <>
      {/* Collapsed Tab - shows when phone is hidden */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-0 z-50 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-l-xl shadow-lg transition-all duration-300 hover:pr-6 ${
          isOpen ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <Smartphone className="w-5 h-5" />
        <span className="text-sm font-medium">Tenant App</span>
        <ChevronRight className="w-4 h-4 -rotate-180" />
      </button>

      {/* Phone Mockup */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
          isOpen
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-[120%] opacity-0 scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-full flex items-center justify-center shadow-lg transition-colors group"
          title="Hide phone"
        >
          <X className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--foreground)]" />
        </button>

        {/* Phone Frame */}
        <div className="phone-mockup w-[320px] rounded-[3rem] p-3 shadow-2xl border-4">
          {/* Phone Inner Screen */}
          <div className="bg-[var(--background)] rounded-[2.25rem] overflow-hidden">
            {/* Phone Status Bar */}
            <div className="bg-[var(--surface)] px-6 py-2 flex items-center justify-between">
              <span className="text-xs text-[var(--foreground-muted)]">9:41</span>
              <div className="flex items-center gap-1">
                <Signal className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
                <Wifi className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
                <Battery className="w-4 h-3.5 text-[var(--foreground-muted)]" />
              </div>
            </div>

            {/* Phone Notch */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[var(--phone-frame)] rounded-b-2xl"></div>
            </div>

            {/* App Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-4 pt-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-white/80" />
                  <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                    Tenant App
                  </span>
                </div>
                {view === "form" && (
                  <button
                    onClick={() => setView("notifications")}
                    className="relative w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <Bell className="w-4 h-4 text-white" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>
                )}
                {view === "notifications" && (
                  <button
                    onClick={() => setView("form")}
                    className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              <h2 className="text-lg font-bold text-white">
                {view === "form" ? "Report Issue" : "Notificaciones"}
              </h2>
            </div>

            {/* Phone Content */}
            <div className="p-4 h-[420px] overflow-y-auto">
              {view === "form" ? (
                <form action={submitIncident} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5 uppercase tracking-wider">
                    Issue Type
                  </label>
                  <select
                    name="type"
                    className="w-full p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--foreground)] text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Maintenance">🔧 Maintenance</option>
                    <option value="Security">🚨 Security</option>
                    <option value="Fire">🔥 Fire / Hazard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5 uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    placeholder="e.g. Apt 404, Lobby"
                    className="w-full p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--foreground)] text-sm placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe the issue..."
                    className="w-full p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--foreground)] text-sm placeholder:text-[var(--foreground-subtle)] resize-none focus:outline-none focus:border-indigo-500"
                    rows={3}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Submit Report
                </button>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--border-subtle)]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[var(--background)] px-3 text-xs text-[var(--foreground-subtle)]">
                      or
                    </span>
                  </div>
                </div>

                {/* SOS Button Placeholder */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/30 cursor-pointer hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-lg">SOS</span>
                  </div>
                </div>
                <p className="text-center text-xs text-[var(--foreground-subtle)]">
                  Hold for 3 seconds for emergency
                </p>
              </form>
              ) : (
                /* Notifications View */
                <div className="space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8 text-[var(--foreground-muted)]" />
                      </div>
                      <h3 className="text-sm font-medium text-[var(--foreground)] mb-1">
                        No hay notificaciones
                      </h3>
                      <p className="text-xs text-[var(--foreground-muted)]">
                        Recibirás notificaciones cuando se resuelvan tus incidentes
                      </p>
                    </div>
                  ) : (
                    <>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="w-full text-xs text-indigo-400 hover:text-indigo-300 text-right mb-2"
                        >
                          Marcar todas como leídas
                        </button>
                      )}
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-xl border ${
                            notif.read
                              ? "bg-[var(--surface)] border-[var(--border-subtle)]"
                              : "bg-emerald-500/10 border-emerald-500/20"
                          }`}
                          onClick={() => !notif.read && handleMarkAsRead(notif.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                                  {notif.title}
                                </h3>
                                {!notif.read && (
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                                )}
                              </div>
                              <p className="text-xs text-[var(--foreground-muted)] mb-2">
                                {notif.message}
                              </p>
                              {notif.resolutionNotes && (
                                <div className="mb-2 p-2 rounded-lg bg-[var(--background)] border border-[var(--border-subtle)]">
                                  <div className="flex items-start gap-2">
                                    <FileText className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[10px] font-medium text-emerald-400 mb-0.5">
                                        Comentario del administrador:
                                      </p>
                                      <p className="text-[10px] text-[var(--foreground-muted)] leading-relaxed">
                                        {notif.resolutionNotes}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center gap-1 text-[10px] text-[var(--foreground-subtle)]">
                                <Clock className="w-3 h-3" />
                                {new Date(notif.createdAt).toLocaleString("es-ES", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Phone Home Indicator */}
            <div className="flex justify-center py-2">
              <div className="w-32 h-1 bg-[var(--foreground-subtle)] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
          📱 Tenant Mobile App
        </div>
      </div>
    </>
  );
}
