import { Router } from 'express';
import {
  contactPage,
  submitContactMessage,
  myMessagesPage
} from './contactController.js';

import {
  requireAuth
} from '../../middleware/auth.js';

const router = Router();

router.get('/contact', contactPage);
router.post('/contact', submitContactMessage);

router.get('/account/messages', requireAuth, myMessagesPage);

export default router;