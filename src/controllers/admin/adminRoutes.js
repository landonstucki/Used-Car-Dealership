import { Router } from 'express';
import upload from '../../middleware/upload.js';
import {
  adminDashboardPage,
  addVehiclePage,
  addVehicleAction,
  manageVehiclesPage,
  deleteVehicleAction
} from './adminController.js';
import { requireEmployee } from '../../middleware/auth.js';

const router = Router();

router.get('/dashboard', requireEmployee, adminDashboardPage);
router.get('/vehicles/add', requireEmployee, addVehiclePage);
router.post('/vehicles/add', requireEmployee, upload.single('vehicle_image'), addVehicleAction);
router.get('/vehicles/manage', requireEmployee, manageVehiclesPage);
router.post('/vehicles/delete', requireEmployee, deleteVehicleAction);

export default router;