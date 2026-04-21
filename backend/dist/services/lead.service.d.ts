export declare class LeadService {
    createLead(data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        budget: number | null;
        preferences: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        source: string | null;
        updatedAt: Date;
        agentId: string | null;
    }>;
    getAllLeads(filter?: any): Promise<{
        aiScore: number;
        agent: {
            name: string;
            email: string;
        } | null;
        id: string;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        budget: number | null;
        preferences: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        source: string | null;
        updatedAt: Date;
        agentId: string | null;
    }[]>;
    getLeadById(id: string): Promise<({
        deals: {
            id: string;
            leadId: string;
            createdAt: Date;
            updatedAt: Date;
            agentId: string;
            title: string;
            stage: import(".prisma/client").$Enums.DealStage;
            amount: number;
            commission: number | null;
            propertyId: string;
        }[];
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
        budget: number | null;
        preferences: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        source: string | null;
        updatedAt: Date;
        agentId: string | null;
    }) | null>;
    updateLead(id: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        budget: number | null;
        preferences: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        source: string | null;
        updatedAt: Date;
        agentId: string | null;
    }>;
    assignLead(leadId: string, agentId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        budget: number | null;
        preferences: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        source: string | null;
        updatedAt: Date;
        agentId: string | null;
    }>;
    deleteLead(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        phone: string | null;
        email: string | null;
        budget: number | null;
        preferences: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        source: string | null;
        updatedAt: Date;
        agentId: string | null;
    }>;
}
