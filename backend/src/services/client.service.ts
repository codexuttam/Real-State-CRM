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
