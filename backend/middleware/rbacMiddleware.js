'use strict';
const asyncHandler = require('express-async-handler');
const AuthService = require('../service/AuthService');
const UnauthorizedError = require('../config/errors/UnauthorizedError');
const ForbiddenError = require('../config/errors/ForbiddenError');

module.exports = function rbacMiddleware(requiredPermission) {
  return asyncHandler(async function (req, res, next) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError('User not authenticated');

    const userPermissions = await AuthService.getPermissionsByUserId(userId);
    const hasPermission = userPermissions.some(p => p.name === requiredPermission);
    if (!hasPermission) throw new ForbiddenError('Insufficient permissions');

    next();
  });
};
