"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealService = exports.ClientService = void 0;
const index_1 = require("../index");
class ClientService {
    async createClient(data) {
        return await index_1.prisma.client.create({
            data,
        });
    }
    async getClients(agentId) {
        return await index_1.prisma.client.findMany({
            where: agentId ? { agentId } : {},
            include: { activities: true },
        });
    }
    async updateClient(id, data) {
        return await index_1.prisma.client.update({
            where: { id },
            data,
        });
    }
}
exports.ClientService = ClientService;
class DealService {
    async createDeal(data) {
        // Basic commission calculation logic: eg. 3% of deal amount
        const commission = data.amount * 0.03;
        return await index_1.prisma.deal.create({
            data: {
                ...data,
                commission: data.commission || commission,
            },
        });
    }
    async getDeals(filters = {}) {
        return await index_1.prisma.deal.findMany({
            where: filters,
            include: {
                lead: true,
                property: true,
                agent: { select: { name: true } },
            },
        });
    }
    async updateDealStage(id, stage) {
        return await index_1.prisma.deal.update({
            where: { id },
            data: { stage },
        });
    }
}
exports.DealService = DealService;
