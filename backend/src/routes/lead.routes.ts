import { Router } from 'express';
import { LeadController } from '../controllers/lead.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, LeadController.createLead);
router.get('/', authenticate, LeadController.getLeads);
router.post('/assign', authenticate, authorize(['ADMIN', 'MANAGER']), LeadController.assignLead);

export default router;
