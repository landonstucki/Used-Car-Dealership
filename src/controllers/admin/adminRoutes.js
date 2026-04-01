import { Router } from 'express';
import upload from '../../middleware/upload.js';
import {
  adminDashboardPage,
  addVehiclePage,
  addVehicleAction
} from './adminController.js';
import { requireEmployee } from '../../middleware/auth.js';

const router = Router();

router.get('/dashboard', requireEmployee, adminDashboardPage);
router.get('/vehicles/add', requireEmployee, addVehiclePage);
router.post('/vehicles/add', requireEmployee, upload.single('vehicle_image'), addVehicleAction);

export default router;