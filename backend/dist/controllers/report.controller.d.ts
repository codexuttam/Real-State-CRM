import { Request, Response } from 'express';
export declare class ReportController {
    static getSalesReport(req: Request, res: Response): Promise<void>;
    static getLeadStats(req: Request, res: Response): Promise<void>;
}
