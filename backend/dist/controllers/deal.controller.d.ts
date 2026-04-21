import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare class DealController {
    createDeal(req: AuthRequest, res: Response): Promise<void>;
    getDeals(req: AuthRequest, res: Response): Promise<void>;
    updateDealStage(req: Request, res: Response): Promise<void>;
}
