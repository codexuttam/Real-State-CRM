"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const index_1 = require("../index");
const event_service_1 = require("./event.service");
class ReminderService {
    static init() {
        // Run every day at 9 AM
        node_cron_1.default.schedule('0 9 * * *', async () => {
            console.log('Running daily reminder checks...');
            await this.checkUpcomingFollowUps();
        });
    }
    static async checkUpcomingFollowUps() {
        // Logic to find leads that haven't been contacted in 3 days
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        const leadsToFollowUp = await index_1.prisma.lead.findMany({
            where: {
                status: 'NEW',
                updatedAt: {
                    lt: threeDaysAgo
                },
                agentId: {
                    not: null
                }
            }
        });
        for (const lead of leadsToFollowUp) {
            if (lead.agentId) {
                await event_service_1.NotificationService.notify(lead.agentId, `Reminder: Lead "${lead.name}" hasn't been contacted for 3 days.`, 'FOLLOW_UP_REMINDER');
            }
        }
    }
}
exports.ReminderService = ReminderService;
