import { Request, Response } from 'express';
import { ClientService } from '../services/client.service';
import { AuthRequest } from '../middleware/auth';

const clientService = new ClientService();

export class ClientController {
  async createClient(req: AuthRequest, res: Response) {
    try {
      const client = await clientService.createClient({
        ...req.body,
        agentId: req.user?.id,
      });
      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getClients(req: AuthRequest, res: Response) {
    try {
      // Agents only see their clients, Admins/Managers see all
      const agentId = req.user?.role === 'AGENT' ? req.user.id : undefined;
      const clients = await clientService.getClients(agentId);
      res.json(clients);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
