// MOCK DATABASE for Tenant Notifications
// In a real app, this would be a SQL DB with user-specific notifications

export interface Notification {
    id: number;
    incidentId: number;
    title: string;
    message: string;
    resolutionNotes?: string;
    type: "resolved" | "info" | "critical";
    createdAt: string;
    read: boolean;
}

export let notifications: Notification[] = [];

/**
 * Get all notifications for tenants
 */
export function getNotifications() {
    return notifications.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * Get unread notifications count
 */
export function getUnreadCount() {
    return notifications.filter(n => !n.read).length;
}

/**
 * Mark notification as read
 */
export function markAsRead(id: number) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
    }
}

/**
 * Mark all notifications as read
 */
export function markAllAsRead() {
    notifications.forEach(n => n.read = true);
}

