import { Request, Response } from 'express';
import { DealService } from '../services/deal.service';
import { AuthRequest } from '../middleware/auth';

const dealService = new DealService();

export class DealController {
  async createDeal(req: AuthRequest, res: Response) {
    try {
      const deal = await dealService.createDeal({
        ...req.body,
        agentId: req.user?.id,
      });
      res.status(201).json(deal);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getDeals(req: AuthRequest, res: Response) {
    try {
      const agentId = req.user?.role === 'AGENT' ? req.user.id : undefined;
      const deals = await dealService.getDeals(agentId ? { agentId } : {});
      res.json(deals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDealStage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { stage } = req.body;
      const deal = await dealService.updateDealStage(id as string, stage);
      res.json(deal);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
