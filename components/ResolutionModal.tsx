"use client";

import { useState } from "react";
import { X, CheckCircle2, AlertTriangle } from "lucide-react";
import { resolveIncident } from "@/app/admin-actions";
import Toast from "./Toast";

interface ResolutionModalProps {
    incident: {
        id: number;
        type: string;
        description: string;
        location: string;
        priority: string;
    };
    onClose: () => void;
}

export default function ResolutionModal({ incident, onClose }: ResolutionModalProps) {
    const [comments, setComments] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log('🔄 [CLIENT] Submitting resolution for incident:', incident.id);
            const notificationSent = await resolveIncident(incident.id, comments);
            console.log('✅ [CLIENT] Resolution complete. Notification sent:', notificationSent);

            if (notificationSent) {
                setShowToast(true);
                console.log('🎉 [CLIENT] Toast notification displayed');
            }

            // Close modal after showing the toast (increased delay)
            setTimeout(() => {
                console.log('🚪 [CLIENT] Closing modal');
                onClose();
            }, 2000); // Increased from 500ms to 2000ms
        } catch (error) {
            console.error("Error resolving incident:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getPriorityBadgeClass = (priority: string) => {
        switch (priority) {
            case "High":
                return "badge-critical";
            case "Medium":
                return "badge-warning";
            case "Pending":
                return "badge-info";
            default:
                return "badge-success";
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="glass rounded-2xl w-full max-w-2xl p-6 pointer-events-auto animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-[var(--foreground)]">
                                Resolve Incident
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg hover:bg-[var(--surface-elevated)] flex items-center justify-center transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5 text-[var(--foreground-muted)]" />
                        </button>
                    </div>

                    {/* Incident Summary */}
                    <div className="bg-[var(--surface)] rounded-xl p-4 mb-6 border border-[var(--border-subtle)]">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-[var(--foreground)]">
                                        {incident.type} Issue
                                    </h3>
                                    <span className={`badge ${getPriorityBadgeClass(incident.priority)}`}>
                                        {incident.priority}
                                    </span>
                                </div>
                                <p className="text-sm text-[var(--foreground-muted)] mb-1">
                                    {incident.description}
                                </p>
                                <p className="text-xs text-[var(--foreground-subtle)]">
                                    Location: {incident.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="resolution-comments"
                                className="block text-sm font-medium text-[var(--foreground-muted)] mb-2 uppercase tracking-wider"
                            >
                                Resolution Comments
                            </label>
                            <textarea
                                id="resolution-comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Describe how the issue was resolved..."
                                className="w-full p-4 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] resize-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                rows={5}
                                required
                            />
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface)] transition-colors font-medium"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                {isSubmitting ? "Resolving..." : "Confirm Resolution"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <Toast
                    message="✅ Incident resolved successfully! Tenant has been notified."
                    type="success"
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}
