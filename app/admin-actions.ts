"use server";

import { revalidatePath } from "next/cache";
import { incidents } from "./lib/data";

export async function getIncidents() {
    return incidents;
}

export async function resolveIncident(id: number) {
    const incident = incidents.find((i) => i.id === id);
    if (incident) {
        incident.status = "Resolved";
    }

    // Revalidate the dashboard path to reflect the status change
    revalidatePath('/');
}
