"use server";

import { revalidatePath } from "next/cache";
import * as tenantService from "@/lib/services/tenant";
import * as adminService from "@/lib/services/admin";

// Public action - any tenant can call this
export async function submitIncident(formData: FormData) {
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;

    await tenantService.submitIncident(type, description, location);
    revalidatePath('/');
}

// Admin action - only managers should call this
export async function getIncidents() {
    return adminService.getIncidents();
}

// Admin action - only managers should call this
export async function resolveIncident(id: number) {
    await adminService.resolveIncident(id);
    revalidatePath('/');
}
