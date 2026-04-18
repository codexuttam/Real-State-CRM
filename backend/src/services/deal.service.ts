import { prisma } from '../index';

export class ClientService {
  async createClient(data: any) {
    return await prisma.client.create({
      data,
    });
  }

  async getClients(agentId?: string) {
    return await prisma.client.findMany({
      where: agentId ? { agentId } : {},
      include: { activities: true },
    });
  }

  async updateClient(id: string, data: any) {
    return await prisma.client.update({
      where: { id },
      data,
    });
  }
}

export class DealService {
  async createDeal(data: any) {
    // Basic commission calculation logic: eg. 3% of deal amount
    const commission = data.amount * 0.03;
    return await prisma.deal.create({
      data: {
        ...data,
        commission: data.commission || commission,
      },
    });
  }

  async getDeals(filters: any = {}) {
    return await prisma.deal.findMany({
      where: filters,
      include: {
        lead: true,
        property: true,
        agent: { select: { name: true } },
      },
    });
  }

  async updateDealStage(id: string, stage: 'NEGOTIATION' | 'AGREEMENT' | 'CLOSED') {
    return await prisma.deal.update({
      where: { id },
      data: { stage },
    });
  }
}
