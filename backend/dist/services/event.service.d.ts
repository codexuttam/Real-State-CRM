export declare class ActivityService {
    static logActivity(data: {
        type: 'CALL' | 'SMS' | 'EMAIL' | 'MEETING';
        description: string;
        userId: string;
        leadId?: string;
        clientId?: string;
    }): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.ActivityType;
        description: string;
        timestamp: Date;
        userId: string;
        leadId: string | null;
        clientId: string | null;
    }>;
}
export declare class NotificationService {
    static notify(userId: string, message: string, type?: string): Promise<{
        id: string;
        type: string | null;
        userId: string;
        message: string;
        read: boolean;
        createdAt: Date;
    }>;
}
