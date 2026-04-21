"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const index_1 = require("../index");
class ReportService {
    static async getSalesReport() {
        const deals = await index_1.prisma.deal.findMany({
            where: { stage: 'CLOSED' },
            include: { agent: { select: { name: true } } },
        });
        const totalRevenue = deals.reduce((sum, deal) => sum + deal.amount, 0);
        const totalCommission = deals.reduce((sum, deal) => sum + (deal.commission || 0), 0);
        // Group by agent
        const agentPerformance = deals.reduce((acc, deal) => {
            const agentName = deal.agent.name;
            if (!acc[agentName]) {
                acc[agentName] = { revenue: 0, deals: 0 };
            }
            acc[agentName].revenue += deal.amount;
            acc[agentName].deals += 1;
            return acc;
        }, {});
        return {
            summary: {
                totalRevenue,
                totalCommission,
                dealCount: deals.length,
            },
            agentPerformance
        };
    }
    static async getLeadStats() {
        const totalLeads = await index_1.prisma.lead.count();
        const statusCounts = await index_1.prisma.lead.groupBy({
            by: ['status'],
            _count: true,
        });
        const conversionRate = totalLeads > 0
            ? (await index_1.prisma.lead.count({ where: { status: 'CLOSED' } }) / totalLeads) * 100
            : 0;
        return {
            totalLeads,
            statusCounts,
            conversionRate: conversionRate.toFixed(2) + '%'
        };
    }
}
exports.ReportService = ReportService;
