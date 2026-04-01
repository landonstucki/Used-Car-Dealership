const setAuthLocals = (req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
};

const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  next();
};

const requireEmployee = (req, res, next) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect('/login');
  }

  if (user.role !== 'employee' && user.role !== 'owner') {
    return res.status(403).send('Forbidden');
  }

  next();
};

const requireOwner = (req, res, next) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect('/login');
  }

  if (user.role !== 'owner') {
    return res.status(403).send('Forbidden');
  }

  next();
};

export { setAuthLocals, requireAuth, requireEmployee, requireOwner };