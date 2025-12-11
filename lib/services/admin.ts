"use server";

import { revalidatePath } from "next/cache";
import { incidents } from "@/lib/data/incidents";
import { notifications } from "@/lib/data/notifications";

/**
 * Service for admin-related operations
 * Protected functions that only managers/admins should use
 */

/**
 * Mock authentication check
 * In a real app, this would verify the user's role/permissions
 */
function isAdmin(): boolean {
    // TODO: Implement real authentication check
    return true;
}

/**
 * Resolve an incident
 * Only admins can resolve incidents
 * @param id - The incident ID to resolve
 * @param resolutionNotes - Optional comments about how the incident was resolved
 */
export async function resolveIncident(id: number, resolutionNotes?: string) {
    // Check if user is admin
    if (!isAdmin()) {
        throw new Error("Unauthorized: Only admins can resolve incidents");
    }

    const incident = incidents.find((i) => i.id === id);
    if (incident) {
        incident.status = "Resolved";
        incident.resolutionNotes = resolutionNotes || "";
        incident.resolvedAt = new Date().toISOString();

        // Create notification for the tenant
        const notification = {
            id: notifications.length + 1,
            incidentId: id,
            title: `Incidente #${id} Resuelto`,
            message: `Tu incidente de ${incident.type} en ${incident.location} ha sido resuelto.`,
            resolutionNotes: resolutionNotes || "",
            type: "resolved" as const,
            createdAt: new Date().toISOString(),
            read: false,
        };

        notifications.unshift(notification);
    }

    // Invalidate cache to update the dashboard
    revalidatePath('/');
}

