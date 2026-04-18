"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const index_1 = require("../index");
class PropertyService {
    async createProperty(data) {
        return await index_1.prisma.property.create({
            data,
        });
    }
    async getProperties(filters) {
        return await index_1.prisma.property.findMany({
            where: {
                location: filters.location ? { contains: filters.location, mode: 'insensitive' } : undefined,
                price: {
                    gte: filters.minPrice,
                    lte: filters.maxPrice,
                },
                type: filters.type,
            },
            include: { agent: { select: { name: true } } },
        });
    }
    async getPropertyById(id) {
        return await index_1.prisma.property.findUnique({
            where: { id },
            include: { deals: true },
        });
    }
    async updateProperty(id, data) {
        return await index_1.prisma.property.update({
            where: { id },
            data,
        });
    }
    async deleteProperty(id) {
        return await index_1.prisma.property.delete({
            where: { id },
        });
    }
}
exports.PropertyService = PropertyService;
