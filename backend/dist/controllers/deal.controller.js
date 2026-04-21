"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealController = void 0;
const deal_service_1 = require("../services/deal.service");
const dealService = new deal_service_1.DealService();
class DealController {
    async createDeal(req, res) {
        try {
            const deal = await dealService.createDeal({
                ...req.body,
                agentId: req.user?.id,
            });
            res.status(201).json(deal);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getDeals(req, res) {
        try {
            const agentId = req.user?.role === 'AGENT' ? req.user.id : undefined;
            const deals = await dealService.getDeals(agentId ? { agentId } : {});
            res.json(deals);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateDealStage(req, res) {
        try {
            const { id } = req.params;
            const { stage } = req.body;
            const deal = await dealService.updateDealStage(id, stage);
            res.json(deal);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.DealController = DealController;
