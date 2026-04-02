import {
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../../models/account/accountModel.js';

const manageUsersPage = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.render('owner/manage-users', {
      title: 'Manage Users',
      users
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRoleAction = async (req, res, next) => {
  try {
    const { user_id, role } = req.body;

    if (Number(user_id) === req.session.user.user_id) {
      return res.redirect('/admin/users');
    }

    await updateUserRole(user_id, role);
    res.redirect('/admin/users');
  } catch (error) {
    next(error);
  }
};

const deleteUserAction = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    if (Number(user_id) === req.session.user.user_id) {
      return res.redirect('/admin/users');
    }

    await deleteUser(user_id);
    res.redirect('/admin/users');
  } catch (error) {
    next(error);
  }
};

export {
  manageUsersPage,
  updateUserRoleAction,
  deleteUserAction
};