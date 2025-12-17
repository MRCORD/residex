// Admin service - Manager operations
// These functions should only be called by authenticated managers

import { incidents } from "./data";

export async function getIncidents() {
    return incidents;
}

export async function resolveIncident(id: number) {
    const incident = incidents.find((i) => i.id === id);
    if (incident) {
        incident.status = "Resolved";
    }
}
