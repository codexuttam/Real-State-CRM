import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, PropertyController.createProperty);
router.get('/', authenticate, PropertyController.getProperties);

export default router;
