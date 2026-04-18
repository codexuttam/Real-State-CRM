import { prisma } from '../index';

export class ReportService {
  static async getSalesReport() {
    const deals = await prisma.deal.findMany({
      where: { stage: 'CLOSED' },
      include: { agent: { select: { name: true } } },
    });

    const totalRevenue = deals.reduce((sum, deal) => sum + deal.amount, 0);
    const totalCommission = deals.reduce((sum, deal) => sum + (deal.commission || 0), 0);

    // Group by agent
    const agentPerformance = deals.reduce((acc: any, deal) => {
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
}
