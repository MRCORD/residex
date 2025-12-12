"use client";

import { X, CheckCircle2, Clock, MessageSquare } from "lucide-react";

interface ResolutionDetailsModalProps {
    incident: {
        id: number;
        type: string;
        description: string;
        location: string;
        priority: string;
        status: string;
        resolvedAt: string | null;
        resolutionComments: string | null;
    };
    onClose: () => void;
}

export default function ResolutionDetailsModal({ incident, onClose }: ResolutionDetailsModalProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                                Resolution Details
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
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-[var(--foreground)]">
                                {incident.type} Issue
                            </h3>
                            <span className="badge badge-success">
                                <CheckCircle2 className="w-3 h-3" />
                                {incident.status}
                            </span>
                        </div>
                        <p className="text-sm text-[var(--foreground-muted)] mb-1">
                            {incident.description}
                        </p>
                        <p className="text-xs text-[var(--foreground-subtle)]">
                            Location: {incident.location}
                        </p>
                    </div>

                    {/* Resolution Information */}
                    <div className="space-y-4">
                        {/* Resolved Timestamp */}
                        <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border-subtle)]">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-indigo-400" />
                                <h4 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider">
                                    Resolved At
                                </h4>
                            </div>
                            <p className="text-[var(--foreground-muted)] pl-6">
                                {incident.resolvedAt ? formatDate(incident.resolvedAt) : 'N/A'}
                            </p>
                        </div>

                        {/* Resolution Comments */}
                        <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border-subtle)]">
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-4 h-4 text-purple-400" />
                                <h4 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider">
                                    Resolution Comments
                                </h4>
                            </div>
                            <p className="text-[var(--foreground-muted)] pl-6 whitespace-pre-wrap">
                                {incident.resolutionComments || 'No comments provided.'}
                            </p>
                        </div>
                    </div>

                    {/* Footer Button */}
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
