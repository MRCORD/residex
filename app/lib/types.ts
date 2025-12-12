export interface Incident {
    id: number;
    type: string;
    description: string;
    location: string;
    priority: string;
    status: string;
    createdAt: string;
    resolvedAt: string | null;
    resolutionComments: string | null;
    tenantNotified: boolean;
    photos: string[]; // Array of base64 encoded images
}
