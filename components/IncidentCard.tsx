"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Wrench,
  Flame,
  Bell,
  X,
  FileText,
} from "lucide-react";
import { resolveIncident } from "@/app/actions";
import Toast from "./Toast";

interface Incident {
  id: number;
  type: string;
  description: string;
  location: string;
  priority: string;
  status: string;
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  notified?: boolean;
}

interface IncidentCardProps {
  incident: Incident;
}

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "High":
      return "priority-critical";
    case "Medium":
      return "priority-warning";
    case "Pending":
      return "priority-info";
    default:
      return "priority-success";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Fire":
      return <Flame className="w-5 h-5" />;
    case "Security":
      return <AlertTriangle className="w-5 h-5" />;
    default:
      return <Wrench className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Fire":
      return "bg-red-500/20 text-red-400";
    case "Security":
      return "bg-amber-500/20 text-amber-400";
    default:
      return "bg-blue-500/20 text-blue-400";
  }
};

export default function IncidentCard({ incident }: IncidentCardProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionNotes.trim()) {
      alert("Por favor, agrega comentarios sobre cómo se resolvió el incidente");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await resolveIncident(incident.id, resolutionNotes);
      if (result?.success && result?.notified) {
        setShowToast(true);
        setIsDialogOpen(false);
        setResolutionNotes("");
        // Refresh the page to show updated incident
        router.refresh();
      }
    } catch (error) {
      console.error("Error al resolver incidente:", error);
      alert("Hubo un error al resolver el incidente");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`incident-card ${getPriorityClass(incident.priority)}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getTypeColor(incident.type)}`}
            >
              {getTypeIcon(incident.type)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[var(--foreground)] truncate">
                  {incident.type} Issue
                </h3>
                <span className="text-[var(--foreground-muted)]">•</span>
                <span className="text-sm text-[var(--foreground-muted)]">
                  {incident.location}
                </span>
              </div>
              <p className="text-[var(--foreground-muted)] text-sm mb-3 line-clamp-2">
                {incident.description}
              </p>

              {/* Resolution Notes - Show if resolved */}
              {incident.status === "Resolved" && incident.resolutionNotes && (
                <div className="mb-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-emerald-400 mb-1">
                        Notas de Resolución:
                      </p>
                      <p className="text-xs text-[var(--foreground-muted)]">
                        {incident.resolutionNotes}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-xs text-[var(--foreground-subtle)] flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Creado:{" "}
                  {new Date(incident.createdAt).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {incident.resolvedAt && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    Resuelto:{" "}
                    {new Date(incident.resolvedAt).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
                <span>ID: #{incident.id}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span
                className={`badge ${
                  incident.status === "Resolved"
                    ? "badge-success"
                    : incident.priority === "High"
                    ? "badge-critical"
                    : incident.priority === "Medium"
                    ? "badge-warning"
                    : "badge-info"
                }`}
              >
                {incident.status === "Resolved" ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Resolved
                  </>
                ) : (
                  incident.priority
                )}
              </span>
              {/* Notified Badge */}
              {incident.status === "Resolved" && incident.notified && (
                <span className="badge badge-info flex items-center gap-1">
                  <Bell className="w-3 h-3" />
                  Notified
                </span>
              )}
            </div>
            {incident.status !== "Resolved" && (
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-9 h-9 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 flex items-center justify-center transition-colors group"
                title="Mark as Resolved"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resolution Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 max-w-md w-full mx-4 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Resolver Incidente
              </h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-[var(--surface-hover)] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[var(--foreground-muted)]" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">
                <span className="font-medium">{incident.type}</span> en{" "}
                <span className="font-medium">{incident.location}</span>
              </p>
              <p className="text-xs text-[var(--foreground-subtle)]">
                {incident.description}
              </p>
            </div>

            <form onSubmit={handleResolve} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Notas de Resolución
                </label>
                <textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Describe cómo se resolvió el incidente..."
                  className="w-full p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--foreground)] text-sm placeholder:text-[var(--foreground-subtle)] resize-none focus:outline-none focus:border-emerald-500"
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] text-sm font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Resolviendo...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Resolver y Notificar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toast
        message={`Tenant has been notified about the resolution of ${incident.type} issue at ${incident.location}`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
