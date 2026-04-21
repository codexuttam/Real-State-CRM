import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const clientController = new ClientController();

router.post('/', authenticate, clientController.createClient);
router.get('/', authenticate, clientController.getClients);

export default router;
