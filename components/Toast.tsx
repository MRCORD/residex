"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X, Bell } from "lucide-react";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number;
    onClose: () => void;
}

export default function Toast({ message, type = "success", duration = 4000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
            case "error":
                return <X className="w-5 h-5 text-red-400" />;
            case "info":
                return <Bell className="w-5 h-5 text-indigo-400" />;
        }
    };

    const getColorClass = () => {
        switch (type) {
            case "success":
                return "border-emerald-500/50 bg-emerald-500/10";
            case "error":
                return "border-red-500/50 bg-red-500/10";
            case "info":
                return "border-indigo-500/50 bg-indigo-500/10";
        }
    };

    return (
        <div
            className={`fixed top-6 right-6 z-[100] transition-all duration-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
        >
            <div
                className={`glass rounded-xl p-4 pr-12 border ${getColorClass()} shadow-lg min-w-[320px] max-w-md`}
            >
                <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">{getIcon()}</div>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">{message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-lg hover:bg-[var(--surface-elevated)] flex items-center justify-center transition-colors"
                    aria-label="Close notification"
                >
                    <X className="w-4 h-4 text-[var(--foreground-muted)]" />
                </button>
            </div>
        </div>
    );
}
