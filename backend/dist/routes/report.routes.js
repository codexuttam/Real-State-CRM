"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../controllers/report.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/sales', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN', 'MANAGER']), report_controller_1.ReportController.getSalesReport);
router.get('/leads', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN', 'MANAGER']), report_controller_1.ReportController.getLeadStats);
exports.default = router;
