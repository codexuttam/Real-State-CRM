"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
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
