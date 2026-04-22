import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { authenticateAI } from '../middleware/auth';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'AI Intelligence Tools Namespace is Active.' });
});

/**
 * @route GET /api/ai/property-search
 * @desc Tool for AI Agent to find matching properties for leads
 * @access Private (AI API Key)
 */
router.get('/property-search', authenticateAI, PropertyController.getProperties);
// Support trailing slash too
router.get('/property-search/', authenticateAI, PropertyController.getProperties);

export default router;
