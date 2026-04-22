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

// Root API confirmation
router.get('/', (req, res) => {
  res.json({ message: 'Real Estate CRM API - Core routes are active.' });
});

// Webhooks (e.g. from n8n)
// We split these into separate calls to be 100% sure the server picks them up
router.post('/webhooks/n8n', WebhookController.handleN8N);
router.post('/webhooks/n8n/', WebhookController.handleN8N);
router.post('/webhook/n8n', WebhookController.handleN8N);
router.post('/webhook/n8n/', WebhookController.handleN8N);

// GET routes for easy browser testing
router.get('/webhooks/n8n', (req, res) => res.json({ message: 'PLURAL endpoint active' }));
router.get('/webhook/n8n', (req, res) => res.json({ message: 'SINGULAR endpoint active' }));

export default router;
