"use client";

import { useState } from "react";
import { CheckCircle, Eye } from "lucide-react";
import ResolutionModal from "./ResolutionModal";
import ResolutionDetailsModal from "./ResolutionDetailsModal";

interface ResolveButtonProps {
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
}

export default function ResolveButton({ incident }: ResolveButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isResolved = incident.status === "Resolved";

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors group ${isResolved
                        ? "bg-indigo-500/20 hover:bg-indigo-500/30"
                        : "bg-emerald-500/20 hover:bg-emerald-500/30"
                    }`}
                title={isResolved ? "View Resolution Details" : "Mark as Resolved"}
            >
                {isResolved ? (
                    <Eye className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
                )}
            </button>

            {isModalOpen && (
                <>
                    {isResolved ? (
                        <ResolutionDetailsModal
                            incident={incident}
                            onClose={() => setIsModalOpen(false)}
                        />
                    ) : (
                        <ResolutionModal
                            incident={{
                                id: incident.id,
                                type: incident.type,
                                description: incident.description,
                                location: incident.location,
                                priority: incident.priority,
                            }}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </>
            )}
        </>
    );
}
