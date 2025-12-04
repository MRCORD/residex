"use client";

import { useState } from "react";
import { X, CheckCircle, FileText } from "lucide-react";
import { resolveIncident } from "@/app/actions";

interface ResolutionDialogProps {
  incidentId: number;
  incidentType: string;
  incidentLocation: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResolutionDialog({
  incidentId,
  incidentType,
  incidentLocation,
  isOpen,
  onClose,
}: ResolutionDialogProps) {
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) {
      alert("Por favor, agrega comentarios sobre cómo se resolvió el incidente");
      return;
    }

    setIsSubmitting(true);
    try {
      await resolveIncident(incidentId, notes);
      setNotes("");
      onClose();
    } catch (error) {
      console.error("Error al resolver incidente:", error);
      alert("Hubo un error al resolver el incidente");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  Resolver Incidente
                </h2>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Agrega detalles de la resolución
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-[var(--foreground-muted)]" />
            </button>
          </div>

          {/* Incident Info */}
          <div className="mb-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-[var(--foreground)]">
                {incidentType}
              </span>
              <span className="text-[var(--foreground-muted)]">•</span>
              <span className="text-sm text-[var(--foreground-muted)]">
                {incidentLocation}
              </span>
            </div>
            <div className="text-xs text-[var(--foreground-subtle)]">
              ID: #{incidentId}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--foreground-muted)]" />
                Notas de Resolución
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe cómo se resolvió el incidente, qué acciones se tomaron, quién lo resolvió, etc..."
                className="w-full p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--foreground)] text-sm placeholder:text-[var(--foreground-subtle)] resize-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                rows={5}
                required
                disabled={isSubmitting}
              />
              <p className="mt-1.5 text-xs text-[var(--foreground-muted)]">
                Este comentario quedará registrado junto con la fecha y hora de resolución
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !notes.trim()}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Resolviendo...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Marcar como Resuelto
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

