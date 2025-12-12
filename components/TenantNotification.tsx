"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCircle2, X } from "lucide-react";
import { Incident } from "@/app/lib/types";

interface TenantNotificationProps {
    incidents: Incident[];
}

export default function TenantNotification({ incidents }: TenantNotificationProps) {
    const [notifications, setNotifications] = useState<Incident[]>([]);
    const [dismissedIds, setDismissedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        console.log('🔔 [TENANT NOTIFICATION] Total incidents:', incidents.length);

        // Filter for recently resolved incidents that tenant was notified about
        const recentlyResolved = incidents.filter(
            (incident) =>
                incident.status === "Resolved" &&
                incident.tenantNotified &&
                !dismissedIds.has(incident.id) &&
                incident.resolvedAt
        );

        console.log('🔔 [TENANT NOTIFICATION] Filtered notifications:', recentlyResolved.length);
        console.log('🔔 [TENANT NOTIFICATION] Notifications:', recentlyResolved);

        setNotifications(recentlyResolved);
    }, [incidents, dismissedIds]);

    const dismissNotification = (id: number) => {
        console.log('🔔 [TENANT NOTIFICATION] Dismissing notification:', id);
        setDismissedIds((prev) => new Set([...prev, id]));
    };

    console.log('🔔 [TENANT NOTIFICATION] Rendering with', notifications.length, 'notifications');

    if (notifications.length === 0) {
        console.log('🔔 [TENANT NOTIFICATION] No notifications to show');
        return null;
    }

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-full max-w-md px-4">
            <div className="space-y-2">
                {notifications.map((incident) => (
                    <div
                        key={incident.id}
                        className="glass rounded-xl p-4 border border-emerald-500/50 bg-emerald-500/10 shadow-lg animate-in slide-in-from-top duration-300"
                    >
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Bell className="w-4 h-4 text-emerald-400" />
                                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                                        Issue Resolved
                                    </h3>
                                </div>
                                <p className="text-xs text-[var(--foreground-muted)] mb-2">
                                    Your <span className="font-medium">{incident.type.toLowerCase()}</span> issue at{" "}
                                    <span className="font-medium">{incident.location}</span> has been resolved.
                                </p>
                                {incident.resolutionComments && (
                                    <p className="text-xs text-[var(--foreground)] bg-[var(--surface)] rounded-lg p-2 mb-2">
                                        "{incident.resolutionComments}"
                                    </p>
                                )}
                                <p className="text-xs text-emerald-400">
                                    Resolved {new Date(incident.resolvedAt!).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <button
                                onClick={() => dismissNotification(incident.id)}
                                className="shrink-0 w-6 h-6 rounded-lg hover:bg-[var(--surface-elevated)] flex items-center justify-center transition-colors"
                                aria-label="Dismiss notification"
                            >
                                <X className="w-4 h-4 text-[var(--foreground-muted)]" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
