import { Router } from 'express';
import { requireAuth, requireEmployee } from '../../middleware/auth.js';
import {
  serviceRequestValidation,
  adminServiceUpdateValidation,
  newServiceRequestPage,
  createServiceRequestAction,
  accountServiceRequestsPage,
  adminServiceRequestsPage,
  updateServiceRequestAction
} from './serviceRequestController.js';

const router = Router();

router.get('/account/service-requests', requireAuth, accountServiceRequestsPage);
router.get('/account/service-requests/new', requireAuth, newServiceRequestPage);
router.post('/account/service-requests/new', requireAuth, serviceRequestValidation, createServiceRequestAction);

router.get('/admin/service-requests', requireEmployee, adminServiceRequestsPage);
router.post('/admin/service-requests/update', requireEmployee, adminServiceUpdateValidation, updateServiceRequestAction);

export default router;