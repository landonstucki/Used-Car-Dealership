import { Router } from 'express';
import { homePage, aboutPage, contactPage } from './index.js';
import {
  inventoryPage,
  vehicleDetailPage
} from './inventory/inventoryController.js';
import accountRoutes from './account/accountRoutes.js';
import adminRoutes from './admin/adminRoutes.js';
import serviceRequestRoutes from './service/serviceRequestRoutes.js';
import ownerRoutes from './owner/ownerRoutes.js';

const router = Router();

router.get('/', homePage);
router.get('/about', aboutPage);
router.get('/contact', contactPage);

router.get('/vehicles', inventoryPage);
router.get('/vehicles/:slug', vehicleDetailPage);

router.use(accountRoutes);
router.use('/admin', adminRoutes);
router.use('/admin', ownerRoutes);
router.use(serviceRequestRoutes);

export default router;