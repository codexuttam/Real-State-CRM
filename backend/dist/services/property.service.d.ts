export declare class PropertyService {
    createProperty(data: any): Promise<{
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
    }>;
    getProperties(filters: {
        location?: string;
        minPrice?: number;
        maxPrice?: number;
        type?: 'RESIDENTIAL' | 'COMMERCIAL';
    }): Promise<({
        agent: {
            name: string;
        } | null;
    } & {
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
    })[]>;
    getPropertyById(id: string): Promise<({
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
    } & {
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
    }) | null>;
    updateProperty(id: string, data: any): Promise<{
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
    }>;
    deleteProperty(id: string): Promise<{
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
    }>;
}
