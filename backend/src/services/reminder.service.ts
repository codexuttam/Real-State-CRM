import cron from 'node-cron';
import { prisma } from '../index';
import { NotificationService } from './event.service';

export class ReminderService {
  static init() {
    // Run every day at 9 AM
    cron.schedule('0 9 * * *', async () => {
      console.log('Running daily reminder checks...');
      await this.checkUpcomingFollowUps();
    });
  }

  private static async checkUpcomingFollowUps() {
    // Logic to find leads that haven't been contacted in 3 days
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const leadsToFollowUp = await prisma.lead.findMany({
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
        await NotificationService.notify(
          lead.agentId,
          `Reminder: Lead "${lead.name}" hasn't been contacted for 3 days.`,
          'FOLLOW_UP_REMINDER'
        );
      }
    }
  }
}
