import { Router } from 'express';
import { homePage, aboutPage, contactPage } from './index.js';
import {
  inventoryPage,
  vehicleDetailPage
} from './inventory/inventoryController.js';

const router = Router();

router.get('/', homePage);
router.get('/about', aboutPage);
router.get('/contact', contactPage);

router.get('/vehicles', inventoryPage);
router.get('/vehicles/:slug', vehicleDetailPage);

export default router;