"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = exports.ActivityService = void 0;
const index_1 = require("../index");
class ActivityService {
    static async logActivity(data) {
        return await index_1.prisma.activity.create({
            data,
        });
    }
}
exports.ActivityService = ActivityService;
class NotificationService {
    static async notify(userId, message, type) {
        return await index_1.prisma.notification.create({
            data: {
                userId,
                message,
                type,
            },
        });
    }
}
exports.NotificationService = NotificationService;
