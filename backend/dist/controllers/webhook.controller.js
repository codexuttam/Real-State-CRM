"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const index_1 = require("../index");
class WebhookController {
    /**
     * Handle incoming data from n8n or other automation tools
     * Example: AI Summary Agent sends a market report
     */
    static async handleN8N(req, res) {
        try {
            const { type, data } = req.body;
            console.log(`Received n8n webhook: ${type}`);
            if (type === 'MARKET_SUMMARY') {
                // You could store this in a "News" table or create a notification
                return res.json({ message: 'Market summary received' });
            }
            if (type === 'LEAD_CAPTURE') {
                const { name, email, phone, budget, preferences, source } = data;
                const lead = await index_1.prisma.lead.create({
                    data: {
                        name,
                        email,
                        phone,
                        budget: budget ? parseFloat(budget) : undefined,
                        preferences,
                        source: source || 'n8n',
                    }
                });
                return res.status(201).json({ message: 'Lead captured', leadId: lead.id });
            }
            res.status(200).json({ status: 'received' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.WebhookController = WebhookController;
