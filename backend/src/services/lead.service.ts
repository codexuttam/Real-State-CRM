import { prisma } from '../index';
import { NotificationService } from './event.service';
import { AILeadScorer } from '../utils/ai-scorer';

export class LeadService {
  async createLead(data: any) {
    return await prisma.lead.create({
      data,
    });
  }

  async getAllLeads(filter: any = {}) {
    const leads = await prisma.lead.findMany({
      where: filter,
      include: { agent: { select: { name: true, email: true } } },
    });
    
    return leads.map(l => ({
      ...l,
      aiScore: AILeadScorer.calculateScore(l)
    }));
  }

  async getLeadById(id: string) {
    return await prisma.lead.findUnique({
      where: { id },
      include: { activities: true, deals: true },
    });
  }

  async updateLead(id: string, data: any) {
    return await prisma.lead.update({
      where: { id },
      data,
    });
  }

  async assignLead(leadId: string, agentId: string) {
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: { agentId },
    });
    
    await NotificationService.notify(
      agentId,
      `A new lead "${lead.name}" has been assigned to you.`,
      'LEAD_ASSIGNMENT'
    );
    
    return lead;
  }

  async deleteLead(id: string) {
    return await prisma.lead.delete({
      where: { id },
    });
  }
}
