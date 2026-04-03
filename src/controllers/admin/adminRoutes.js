import { Router } from 'express';
import upload from '../../middleware/upload.js';
import {
  adminDashboardPage,
  addVehiclePage,
  addVehicleAction,
  manageVehiclesPage,
  deleteVehicleAction,
  manageContactMessagesPage,
  contactMessageDetailPage,
  respondToMessageAction
} from './adminController.js';
import { requireEmployee } from '../../middleware/auth.js';

const router = Router();

router.get('/dashboard', requireEmployee, adminDashboardPage);

router.get('/contact', requireEmployee, manageContactMessagesPage);
router.get('/contact/:messageId', requireEmployee, contactMessageDetailPage);
router.post('/contact/:messageId/respond', requireEmployee, respondToMessageAction);

router.get('/vehicles/add', requireEmployee, addVehiclePage);
router.post(
  '/vehicles/add',
  requireEmployee,
  upload.single('vehicle_image'),
  addVehicleAction
);

router.get('/vehicles/manage', requireEmployee, manageVehiclesPage);
router.post('/vehicles/delete', requireEmployee, deleteVehicleAction);

export default router;