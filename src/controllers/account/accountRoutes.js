import { Router } from 'express';
import { body } from 'express-validator';
import {
  loginPage,
  registerPage,
  dashboardPage,
  registerAction,
  loginAction,
  logoutAction
} from './accountController.js';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();

const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
];

const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

router.get('/login', loginPage);
router.get('/register', registerPage);
router.get('/account/dashboard', requireAuth, dashboardPage);

router.post('/register', registerValidation, registerAction);
router.post('/login', loginValidation, loginAction);
router.post('/logout', logoutAction);
export default router;