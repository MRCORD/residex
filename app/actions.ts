"use server";

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

    // BUG: Missing revalidatePath('/')
    // The UI will not update until the user manually refreshes.
}

export async function resolveIncident(id: number) {
    const incident = incidents.find((i) => i.id === id);
    if (incident) {
        incident.status = "Resolved";
    }

    // BUG: Also missing revalidatePath here
}
