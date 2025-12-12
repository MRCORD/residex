"use server";

import { revalidatePath } from "next/cache";
import { incidents } from "./lib/data";

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

    // Revalidate the dashboard path to show the new incident
    revalidatePath('/');
}
