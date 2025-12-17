// Public service - Tenant operations
// These functions can be called by any tenant

import { incidents } from "./data";

export async function submitIncident(type: string, description: string, location: string) {
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
}
