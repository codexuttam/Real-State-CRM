import { Request, Response } from 'express';
import { prisma } from '../index';

export class WebhookController {
  /**
   * Handle incoming data from n8n or other automation tools
   * Example: AI Summary Agent sends a market report
   */
  static async handleN8N(req: Request, res: Response) {
    try {
      // Basic Auth Check
      const apiKey = req.header('x-n8n-api-key');
      if (apiKey !== 'n8n_integration_secret_99') {
        console.warn('Unauthorized n8n webhook attempt');
        return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Bad Request: No data received' });
      }

      const { type, data } = req.body;
      
      console.log(`Received n8n webhook: ${type}`);
      console.log('Webhook data:', JSON.stringify(data, null, 2));
      
      if (type === 'MARKET_SUMMARY') {
        // You could store this in a "News" table or create a notification
        return res.json({ message: 'Market summary received' });
      }

      if (type === 'LEAD_CAPTURE') {
        const { name, email, phone, budget, preferences, source } = data;
        
        if (!name) {
          console.error('Lead capture failed: Missing name in data');
          return res.status(400).json({ error: 'Name is required for lead capture' });
        }

        const lead = await prisma.lead.create({
          data: {
            name,
            email,
            phone,
            budget: budget ? parseFloat(budget) : undefined,
            preferences,
            source: source || 'n8n',
          }
        });
        console.log('Lead captured successfully:', lead.id);
        return res.status(201).json({ message: 'Lead captured', leadId: lead.id });
      }

      if (type === 'LEAD_ENRICHMENT') {
        const { leadId, aiSummary, aiScore } = data;
        
        if (!leadId) {
          return res.status(400).json({ error: 'leadId is required for enrichment' });
        }

        const updatedLead = await prisma.lead.update({
          where: { id: leadId },
          data: {
            aiSummary,
            aiScore: aiScore ? parseInt(aiScore) : undefined
          }
        });

        console.log('Lead enriched with AI data:', updatedLead.id);
        return res.status(200).json({ message: 'Lead enriched', leadId: updatedLead.id });
      }

      res.status(200).json({ status: 'received' });
    } catch (error: any) {
      console.error('Webhook error:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}
