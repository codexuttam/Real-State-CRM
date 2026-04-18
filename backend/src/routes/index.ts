import { Router } from 'express';
import leadRoutes from './lead.routes';
import { PropertyController } from '../controllers/property.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use('/leads', leadRoutes);

// Properties
router.post('/properties', authenticate, PropertyController.createProperty);
router.get('/properties', authenticate, PropertyController.getProperties);

// Clients and Deals would follow a similar pattern
// router.use('/clients', clientRoutes);
// router.use('/deals', dealRoutes);

export default router;
