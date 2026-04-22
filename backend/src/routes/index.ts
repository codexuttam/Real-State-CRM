import { Router } from 'express';
import leadRoutes from './lead.routes';
import clientRoutes from './client.routes';
import dealRoutes from './deal.routes';
import propertyRoutes from './property.routes';
import reportRoutes from './report.routes';
import authRoutes from './auth.routes';
import uploadRoutes from './upload.routes';
import { WebhookController } from '../controllers/webhook.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/leads', leadRoutes);
router.use('/clients', clientRoutes);
router.use('/deals', dealRoutes);
router.use('/properties', propertyRoutes);
router.use('/reports', reportRoutes);

// Webhooks (e.g. from n8n)
// This handles /webhooks/n8n, /webhook/n8n, and versions with trailing slashes
router.post(['/webhooks/n8n', '/webhooks/n8n/', '/webhook/n8n', '/webhook/n8n/'], WebhookController.handleN8N);

// GET route for easy testing in browser
router.get(['/webhooks/n8n', '/webhook/n8n'], (req, res) => {
  res.json({ message: 'Webhook endpoint is active. Use POST to send data.' });
});

export default router;
