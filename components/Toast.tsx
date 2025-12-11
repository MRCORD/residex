"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in">
      <div className="glass rounded-xl p-4 shadow-lg border border-emerald-500/20 min-w-[320px] max-w-md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--foreground)]">
              Tenant Notified
            </p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-lg hover:bg-[var(--surface-hover)] flex items-center justify-center transition-colors shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-[var(--foreground-muted)]" />
          </button>
        </div>
      </div>
    </div>
  );
}

