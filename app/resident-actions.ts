"use server";

import { revalidatePath } from "next/cache";
import { incidents } from "./lib/data";

export async function submitIncident(formData: FormData) {
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const photos = formData.getAll("photos") as string[]; // base64 strings

    console.log('📝 [SUBMIT] Creating new incident with', photos.length, 'photos');

    const newIncident = {
        id: incidents.length + 1,
        type,
        description,
        location,
        priority: "Pending", // Needs AI Triage
        status: "Open",
        createdAt: new Date().toISOString(),
        resolvedAt: null,
        resolutionComments: null,
        tenantNotified: false,
        photos: photos || [],
    };

    incidents.unshift(newIncident);

    console.log('✅ [SUBMIT] Incident created:', newIncident.id, 'with', newIncident.photos.length, 'photos');

    // Revalidate the dashboard path to show the new incident
    revalidatePath('/');
}
