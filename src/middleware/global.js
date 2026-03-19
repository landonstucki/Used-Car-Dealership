/**
 * Global template variables middleware
 *
 * Makes common variables available to all EJS templates without having to pass
 * them individually from each route handler
 */

const addLocalVariables = (req, res, next) => {
  res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
  res.locals.currentYear = new Date().getFullYear();
  next();
};

export { addLocalVariables };