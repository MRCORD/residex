"use server";

import { revalidatePath } from "next/cache";
import { incidents } from "@/lib/data/incidents";
import { submitIncident as tenantSubmitIncident } from "@/lib/services/tenant";
import { resolveIncident as adminResolveIncident } from "@/lib/services/admin";
import { getNotifications, markAsRead, markAllAsRead, getUnreadCount } from "@/lib/data/notifications";

/**
 * Server Actions - Thin wrappers that delegate to service layers
 * This file acts as the public API for Server Actions
 */

/**
 * Get all incidents
 * Public function - can be called by anyone
 */
export async function getIncidents() {
    return incidents;
}

/**
 * Submit a new incident
 * Public function - delegates to tenant service
 */
export async function submitIncident(formData: FormData) {
    return await tenantSubmitIncident(formData);
}

/**
 * Resolve an incident
 * Admin-only function - delegates to admin service
 * @param id - The incident ID to resolve
 * @param resolutionNotes - Optional comments about how the incident was resolved
 */
export async function resolveIncident(id: number, resolutionNotes?: string) {
    return await adminResolveIncident(id, resolutionNotes);
}

/**
 * Get all notifications for tenants
 */
export async function getTenantNotifications() {
    return getNotifications();
}

/**
 * Get unread notifications count
 */
export async function getUnreadNotificationsCount() {
    return getUnreadCount();
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(id: number) {
    markAsRead(id);
    revalidatePath('/');
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead() {
    markAllAsRead();
    revalidatePath('/');
}
