"use server";

import { revalidatePath } from "next/cache";

// MOCK DATABASE
// In a real app, this would be a SQL DB
let incidents = [
    {
        id: 1,
        type: "Maintenance",
        description: "Elevator 3 is making a grinding noise",
        location: "Lobby",
        priority: "High",
        status: "Open",
        createdAt: "2023-10-01T10:00:00Z",
    },
    {
        id: 2,
        type: "Security",
        description: "Side door propped open",
        location: "Garage B",
        priority: "Medium",
        status: "Resolved",
        createdAt: "2023-10-02T14:30:00Z",
        resolvedAt: "2023-10-02T15:00:00Z",
        resolutionNotes: "Door secured and lock mechanism replaced",
        notified: true,
    },
];

export async function getIncidents() {
    return incidents;
}

export async function submitIncident(formData: FormData) {
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;

    const newIncident = {
        id: incidents.length + 1,
        type,
        description,
        location,
        priority: "Pending", // Needs AI Triage
        status: "Open",
        createdAt: new Date().toISOString(),
    };

    incidents.unshift(newIncident);

    revalidatePath("/");
}

// Mock function to send notification to tenant
export async function sendNotification(
    incidentId: number,
    incidentType: string,
    location: string,
    resolutionNotes: string
) {
    const message = `Your ${incidentType} issue at ${location} has been resolved. ${resolutionNotes ? `Notes: ${resolutionNotes}` : ""}`;
    
    console.log("📧 [MOCK NOTIFICATION] Sending notification to tenant:");
    console.log(`   Incident ID: ${incidentId}`);
    console.log(`   Type: ${incidentType}`);
    console.log(`   Location: ${location}`);
    console.log(`   Message: ${message}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);
    
    // In a real app, this would send an email, SMS, or push notification
    return { success: true, message };
}

export async function resolveIncident(id: number, resolutionNotes?: string) {
    const incident = incidents.find((i) => i.id === id);
    if (incident) {
        incident.status = "Resolved";
        incident.resolvedAt = new Date().toISOString();
        incident.resolutionNotes = resolutionNotes || "";
        
        // Automatically send notification to tenant
        await sendNotification(
            incident.id,
            incident.type,
            incident.location,
            resolutionNotes || "Issue has been resolved."
        );
        
        // Mark as notified
        incident.notified = true;
        
        revalidatePath("/");
        return { success: true, notified: true };
    }

    return { success: false, notified: false };
}
