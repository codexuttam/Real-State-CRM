import { Request, Response } from 'express';
export declare class LeadController {
    static createLead(req: Request, res: Response): Promise<void>;
    static getLeads(req: Request, res: Response): Promise<void>;
    static assignLead(req: Request, res: Response): Promise<void>;
}
