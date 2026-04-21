"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const client_service_1 = require("../services/client.service");
const clientService = new client_service_1.ClientService();
class ClientController {
    async createClient(req, res) {
        try {
            const client = await clientService.createClient({
                ...req.body,
                agentId: req.user?.id,
            });
            res.status(201).json(client);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getClients(req, res) {
        try {
            // Agents only see their clients, Admins/Managers see all
            const agentId = req.user?.role === 'AGENT' ? req.user.id : undefined;
            const clients = await clientService.getClients(agentId);
            res.json(clients);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.ClientController = ClientController;
