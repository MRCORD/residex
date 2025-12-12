"use server";

import { revalidatePath } from "next/cache";
import { incidents } from "./lib/data";
import { Incident } from "./lib/types";
import { sendNotification } from "./lib/notifications";

export async function getIncidents(): Promise<Incident[]> {
    return incidents;
}

export async function resolveIncident(id: number, resolutionComments: string) {
    console.log(`\n🔧 [ADMIN ACTION] Starting incident resolution for ID: ${id}`);
    console.log(`📝 Resolution comments: "${resolutionComments}"`);

    const incident = incidents.find((i) => i.id === id);

    if (incident) {
        console.log(`✅ Incident found:`, {
            id: incident.id,
            type: incident.type,
            location: incident.location,
            status: incident.status
        });

        incident.status = "Resolved";
        incident.resolvedAt = new Date().toISOString();
        incident.resolutionComments = resolutionComments;

        console.log(`📤 Preparing to send notification...`);

        // Send notification to tenant
        const notificationMessage = `Your ${incident.type.toLowerCase()} issue at ${incident.location} has been resolved. Resolution: ${resolutionComments}`;

        console.log(`📧 Calling sendNotification function...`);
        const notificationSent = await sendNotification(1, incident.id, notificationMessage);

        console.log(`📬 Notification sent status: ${notificationSent}`);

        incident.tenantNotified = notificationSent;

        console.log(`✅ Incident ${id} fully resolved. Tenant notified: ${notificationSent}\n`);
    } else {
        console.log(`❌ ERROR: Incident with ID ${id} not found!\n`);
    }

    // Revalidate the dashboard path to reflect the status change
    revalidatePath('/');

    return incident?.tenantNotified || false;
}
