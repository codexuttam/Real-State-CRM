import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare class ClientController {
    createClient(req: AuthRequest, res: Response): Promise<void>;
    getClients(req: AuthRequest, res: Response): Promise<void>;
}
