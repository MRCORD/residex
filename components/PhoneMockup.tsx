"use client";

import { useState, useEffect, useRef } from "react";
import {
  Smartphone,
  Wifi,
  Battery,
  Signal,
  Send,
  ChevronRight,
  X,
  Bell,
} from "lucide-react";
import { submitIncident } from "@/app/resident-actions";
import { Incident } from "@/app/lib/types";
import TenantNotification from "./TenantNotification";
import ImageUpload from "./ImageUpload";

interface PhoneMockupProps {
  incidents: Incident[];
}

export default function PhoneMockup({ incidents }: PhoneMockupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Count unread notifications
  const unreadCount = incidents.filter(
    (i) => i.status === "Resolved" && i.tenantNotified
  ).length;

  // Auto-show notifications when there are new ones
  useEffect(() => {
    console.log('📱 [TENANT APP] Incidents received:', incidents.length);
    console.log('📱 [TENANT APP] Unread notifications:', unreadCount);
    console.log('📱 [TENANT APP] Resolved incidents:', incidents.filter(i => i.status === "Resolved"));

    if (unreadCount > 0) {
      console.log('📱 [TENANT APP] Auto-showing notifications');
      setShowNotifications(true);
    }
  }, [incidents, unreadCount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Add photos to form data
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    try {
      await submitIncident(formData);

      console.log('📝 [TENANT APP] Incident submitted, resetting form...');

      // Reset form using ref
      if (formRef.current) {
        formRef.current.reset();
      }

      // Reset state
      setPhotos([]);
      setResetKey(prev => prev + 1); // Trigger ImageUpload reset

      console.log('✅ [TENANT APP] Form reset successfully');
    } catch (error) {
      console.error('Error submitting incident:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Tenant Notifications */}
      {showNotifications && <TenantNotification incidents={incidents} />}
      {/* Collapsed Tab - shows when phone is hidden */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-0 z-50 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-l-xl shadow-lg transition-all duration-300 hover:pr-6 ${isOpen ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
      >
        <Smartphone className="w-5 h-5" />
        <span className="text-sm font-medium">Tenant App</span>
        <ChevronRight className="w-4 h-4 -rotate-180" />
      </button>

      {/* Phone Mockup */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${isOpen
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-white/80" />
                  <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                    Tenant App
                  </span>
                </div>
                {/* Notification Bell */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="View notifications"
                >
                  <Bell className="w-4 h-4 text-white" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">Report Issue</h2>
            </div>

            {/* Phone Content - Form */}
            <div className="p-4 h-[420px] overflow-y-auto">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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

                {/* Photo Upload */}
                <ImageUpload
                  maxImages={3}
                  maxSizeMB={5}
                  onImagesChange={setPhotos}
                  resetTrigger={resetKey}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Submit Report"}
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
