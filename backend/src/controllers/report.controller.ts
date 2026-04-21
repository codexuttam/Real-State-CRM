import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';

export class ReportController {
  static async getSalesReport(req: Request, res: Response) {
    try {
      const report = await ReportService.getSalesReport();
      res.json(report);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getLeadStats(req: Request, res: Response) {
    try {
      // Logic for lead conversion rates etc.
      const stats = await ReportService.getLeadStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
