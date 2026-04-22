import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { authenticateAI } from '../middleware/auth';

const router = Router();

/**
 * @route GET /api/ai/property-search
 * @desc Tool for AI Agent to find matching properties for leads
 * @access Private (AI API Key)
 */
router.get('/property-search', authenticateAI, PropertyController.getProperties);

export default router;
