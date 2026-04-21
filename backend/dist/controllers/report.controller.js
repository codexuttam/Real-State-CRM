"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const report_service_1 = require("../services/report.service");
class ReportController {
    static async getSalesReport(req, res) {
        try {
            const report = await report_service_1.ReportService.getSalesReport();
            res.json(report);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getLeadStats(req, res) {
        try {
            // Logic for lead conversion rates etc.
            const stats = await report_service_1.ReportService.getLeadStats();
            res.json(stats);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.ReportController = ReportController;
