import { Router } from 'express';
import {
  homePage,
  aboutPage,
  vehiclesPage,
  contactPage
} from './index.js';

const router = Router();

router.get('/', homePage);
router.get('/about', aboutPage);
router.get('/vehicles', vehiclesPage);
router.get('/contact', contactPage);

export default router;