"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadService = void 0;
const index_1 = require("../index");
const event_service_1 = require("./event.service");
const ai_scorer_1 = require("../utils/ai-scorer");
class LeadService {
    async createLead(data) {
        return await index_1.prisma.lead.create({
            data,
        });
    }
    async getAllLeads(filter = {}) {
        const leads = await index_1.prisma.lead.findMany({
            where: filter,
            include: { agent: { select: { name: true, email: true } } },
        });
        return leads.map(l => ({
            ...l,
            aiScore: ai_scorer_1.AILeadScorer.calculateScore(l)
        }));
    }
    async getLeadById(id) {
        return await index_1.prisma.lead.findUnique({
            where: { id },
            include: { activities: true, deals: true },
        });
    }
    async updateLead(id, data) {
        return await index_1.prisma.lead.update({
            where: { id },
            data,
        });
    }
    async assignLead(leadId, agentId) {
        const lead = await index_1.prisma.lead.update({
            where: { id: leadId },
            data: { agentId },
        });
        await event_service_1.NotificationService.notify(agentId, `A new lead "${lead.name}" has been assigned to you.`, 'LEAD_ASSIGNMENT');
        return lead;
    }
    async deleteLead(id) {
        return await index_1.prisma.lead.delete({
            where: { id },
        });
    }
}
exports.LeadService = LeadService;
