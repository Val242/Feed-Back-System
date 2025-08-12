// middlewares/roleMiddleware.js
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (req.admin.role !== requiredRole) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

module.exports = roleMiddleware;
