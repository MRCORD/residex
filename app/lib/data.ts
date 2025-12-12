import { Incident } from "./types";

// MOCK DATABASE
// In a real app, this would be a SQL DB
export const incidents: Incident[] = [
    {
        id: 1,
        type: "Maintenance",
        description: "Elevator 3 is making a grinding noise",
        location: "Lobby",
        priority: "High",
        status: "Open",
        createdAt: "2023-10-01T10:00:00Z",
        resolvedAt: null,
        resolutionComments: null,
        tenantNotified: false,
        photos: [],
    },
    {
        id: 2,
        type: "Security",
        description: "Side door propped open",
        location: "Garage B",
        priority: "Medium",
        status: "Resolved",
        createdAt: "2023-10-02T14:30:00Z",
        resolvedAt: "2023-10-02T15:45:00Z",
        resolutionComments: "Security team secured the door and notified building maintenance.",
        tenantNotified: true,
        photos: [],
    },
];
