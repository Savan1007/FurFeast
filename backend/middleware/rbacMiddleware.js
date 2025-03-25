'use strict';
const AuthService = require('../services/authService');

module.exports = function rbacMiddleware(requiredPermission) {
  return async function (req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const userPermissions = await AuthService.getPermissionsByUserId(userId);

      const hasPermission = userPermissions.some(p => p.name === requiredPermission);
      if (!hasPermission) {
        return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
      }

      next();
    } catch (err) {
      console.error('RBAC Middleware Error:', err.message);
      return res.status(500).json({ error: 'Internal authorization error' });
    }
  };
};
