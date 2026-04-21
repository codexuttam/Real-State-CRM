export declare class ReportService {
    static getSalesReport(): Promise<{
        summary: {
            totalRevenue: number;
            totalCommission: number;
            dealCount: number;
        };
        agentPerformance: any;
    }>;
    static getLeadStats(): Promise<{
        totalLeads: number;
        statusCounts: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeadGroupByOutputType, "status"[]> & {
            _count: number;
        })[];
        conversionRate: string;
    }>;
}
