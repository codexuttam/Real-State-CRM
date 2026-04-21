"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_routes_1 = __importDefault(require("./lead.routes"));
const client_routes_1 = __importDefault(require("./client.routes"));
const deal_routes_1 = __importDefault(require("./deal.routes"));
const property_routes_1 = __importDefault(require("./property.routes"));
const report_routes_1 = __importDefault(require("./report.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const upload_routes_1 = __importDefault(require("./upload.routes"));
const webhook_controller_1 = require("../controllers/webhook.controller");
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/upload', upload_routes_1.default);
router.use('/leads', lead_routes_1.default);
router.use('/clients', client_routes_1.default);
router.use('/deals', deal_routes_1.default);
router.use('/properties', property_routes_1.default);
router.use('/reports', report_routes_1.default);
// Webhooks (e.g. from n8n)
router.post('/webhooks/n8n', webhook_controller_1.WebhookController.handleN8N);
exports.default = router;
