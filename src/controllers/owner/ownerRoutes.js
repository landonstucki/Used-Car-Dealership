import { Router } from 'express';
import { requireOwner } from '../../middleware/auth.js';
import {
  manageUsersPage,
  updateUserRoleAction,
  deleteUserAction
} from './ownerController.js';

const router = Router();

router.get('/users', requireOwner, manageUsersPage);
router.post('/users/role', requireOwner, updateUserRoleAction);
router.post('/users/delete', requireOwner, deleteUserAction);

export default router;