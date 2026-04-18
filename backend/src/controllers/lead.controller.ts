import { Request, Response } from 'express';
import { LeadService } from '../services/lead.service';

const leadService = new LeadService();

export class LeadController {
  static async createLead(req: Request, res: Response) {
    try {
      const lead = await leadService.createLead(req.body);
      res.status(201).json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getLeads(req: Request, res: Response) {
    try {
      const leads = await leadService.getAllLeads(req.query);
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async assignLead(req: Request, res: Response) {
    try {
      const { leadId, agentId } = req.body;
      const lead = await leadService.assignLead(leadId, agentId);
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
