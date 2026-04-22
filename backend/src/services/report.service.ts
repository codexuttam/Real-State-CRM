import { prisma } from '../index';

export class ReportService {
  static async getSalesReport() {
    const allDeals = await prisma.deal.findMany({
      include: { agent: { select: { name: true } } },
    });

    const closedDeals = allDeals.filter(d => d.stage === 'CLOSED');
    const pipelineDeals = allDeals.filter(d => d.stage !== 'CLOSED');

    const totalRevenue = closedDeals.reduce((sum, deal) => sum + deal.amount, 0);
    const pipelineValue = pipelineDeals.reduce((sum, deal) => sum + deal.amount, 0);
    const totalCommission = closedDeals.reduce((sum, deal) => sum + (deal.commission || 0), 0);

    // Group by agent (using all deals for activity, but revenue for closed)
    const agentPerformance = allDeals.reduce((acc: any, deal) => {
      const agentName = deal.agent.name;
      if (!acc[agentName]) {
        acc[agentName] = { revenue: 0, deals: 0, pipeline: 0 };
      }
      if (deal.stage === 'CLOSED') {
        acc[agentName].revenue += deal.amount;
        acc[agentName].deals += 1;
      } else {
        acc[agentName].pipeline += deal.amount;
      }
      return acc;
    }, {});

    return {
      summary: {
        totalRevenue,
        pipelineValue,
        totalCommission,
        dealCount: closedDeals.length,
        pipelineCount: pipelineDeals.length,
      },
      agentPerformance
    };
  }

  static async getLeadStats() {
    const totalLeads = await prisma.lead.count();
    const statusCounts = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    });

    const conversionRate = totalLeads > 0 
      ? (await prisma.lead.count({ where: { status: 'CLOSED' } }) / totalLeads) * 100 
      : 0;

    return {
      totalLeads,
      statusCounts,
      conversionRate: conversionRate.toFixed(2) + '%'
    };
  }
}
