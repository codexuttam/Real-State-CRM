export declare class DealService {
    createDeal(data: any): Promise<{
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
    }>;
    getDeals(filters?: any): Promise<({
        lead: {
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
        };
        agent: {
            name: string;
        };
        property: {
            id: string;
            type: import(".prisma/client").$Enums.PropertyType;
            description: string | null;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PropertyStatus;
            updatedAt: Date;
            agentId: string | null;
            title: string;
            location: string;
            price: number;
            size: number | null;
            amenities: string | null;
            images: string[];
        };
    } & {
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
    })[]>;
    updateDealStage(id: string, stage: 'NEGOTIATION' | 'AGREEMENT' | 'CLOSED'): Promise<{
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
    }>;
}
