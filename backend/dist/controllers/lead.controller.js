"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadController = void 0;
const lead_service_1 = require("../services/lead.service");
const leadService = new lead_service_1.LeadService();
class LeadController {
    static async createLead(req, res) {
        try {
            const lead = await leadService.createLead(req.body);
            res.status(201).json(lead);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async getLeads(req, res) {
        try {
            const leads = await leadService.getAllLeads(req.query);
            res.json(leads);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async assignLead(req, res) {
        try {
            const { leadId, agentId } = req.body;
            const lead = await leadService.assignLead(leadId, agentId);
            res.json(lead);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.LeadController = LeadController;
