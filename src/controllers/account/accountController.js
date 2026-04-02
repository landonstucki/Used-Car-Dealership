import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import {
  createUser,
  getUserByEmail
} from '../../models/account/accountModel.js';

const loginPage = (req, res) => {
  res.render('account/login', {
    title: 'Login'
  });
};

const registerPage = (req, res) => {
  res.render('account/register', {
    title: 'Register'
  });
};



const dashboardPage = (req, res) => {
  res.render('account/dashboard', {
    title: 'Account Dashboard'
  });
};

const registerAction = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('registerAction validation errors:', errors.array());
    return res.redirect('/register');
  }

  try {
    console.log('REGISTER ACTION HIT');
    console.log('BODY:', req.body);

    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    console.log('EXISTING USER:', existingUser);

    if (existingUser) {
      console.log('User already exists');
      return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('HASH CREATED');

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    console.log('USER CREATED:', user);

    req.session.user = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.send('Registration worked');
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    next(error);
  }
};

const loginAction = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('loginAction validation errors:', errors.array());
    return res.redirect('/login');
  }

  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.redirect('/login');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.redirect('/login');
    }

    req.session.user = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    if (user.role === 'owner' || user.role === 'employee') {
      return res.redirect('/admin/dashboard');
    }

    res.redirect('/account/dashboard');
  } catch (error) {
    next(error);
  }
};

const logoutAction = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

export {
  loginPage,
  registerPage,
  dashboardPage,
  registerAction,
  loginAction,
  logoutAction
};