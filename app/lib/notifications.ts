/**
 * Mock notification service
 * In a real app, this would integrate with email, SMS, or push notification services
 */

export async function sendNotification(
    tenantId: number,
    incidentId: number,
    message: string
): Promise<boolean> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Log to console (mock notification) - SERVER SIDE
    const timestamp = new Date().toLocaleString();

    console.log("\n");
    console.log("🔔".repeat(30));
    console.log("📧 NOTIFICATION SENT TO TENANT");
    console.log("🔔".repeat(30));
    console.log(`⏰ Timestamp: ${timestamp}`);
    console.log(`👤 To: Tenant #${tenantId}`);
    console.log(`🎫 Incident ID: #${incidentId}`);
    console.log(`📝 Message:`);
    console.log(`   ${message}`);
    console.log("🔔".repeat(30));
    console.log("\n");

    // Also log to browser console if available
    if (typeof window !== 'undefined') {
        console.log('%c🔔 NOTIFICATION SENT', 'background: #4f46e5; color: white; padding: 8px; font-weight: bold; font-size: 14px;');
        console.log(`Tenant #${tenantId} - Incident #${incidentId}`);
        console.log(message);
    }

    // Simulate successful notification
    return true;
}
