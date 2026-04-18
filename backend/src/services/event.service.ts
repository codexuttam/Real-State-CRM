import { prisma } from '../index';

export class ActivityService {
  static async logActivity(data: {
    type: 'CALL' | 'SMS' | 'EMAIL' | 'MEETING';
    description: string;
    userId: string;
    leadId?: string;
    clientId?: string;
  }) {
    return await prisma.activity.create({
      data,
    });
  }
}

export class NotificationService {
  static async notify(userId: string, message: string, type?: string) {
    return await prisma.notification.create({
      data: {
        userId,
        message,
        type,
      },
    });
  }
}
