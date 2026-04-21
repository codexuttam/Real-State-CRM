export declare class ClientService {
    createClient(data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        updatedAt: Date;
        agentId: string | null;
        notes: string | null;
    }>;
    getClients(agentId?: string): Promise<({
        activities: {
            id: string;
            type: import(".prisma/client").$Enums.ActivityType;
            description: string;
            timestamp: Date;
            userId: string;
            leadId: string | null;
            clientId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        updatedAt: Date;
        agentId: string | null;
        notes: string | null;
    })[]>;
    updateClient(id: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        updatedAt: Date;
        agentId: string | null;
        notes: string | null;
    }>;
}
