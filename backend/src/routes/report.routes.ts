import { Router } from 'express';
import { ReportController } from '../controllers/report.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/sales', authenticate, authorize(['ADMIN', 'MANAGER']), ReportController.getSalesReport);
router.get('/leads', authenticate, authorize(['ADMIN', 'MANAGER']), ReportController.getLeadStats);

export default router;
