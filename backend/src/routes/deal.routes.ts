import { Router } from 'express';
import { DealController } from '../controllers/deal.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const dealController = new DealController();

router.post('/', authenticate, dealController.createDeal);
router.get('/', authenticate, dealController.getDeals);
router.patch('/:id/stage', authenticate, dealController.updateDealStage);

export default router;
