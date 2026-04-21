"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealService = void 0;
const index_1 = require("../index");
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
