export const canAccess = (user, permissions, requiredPermission) => {
  if (!user) return false;

  // SuperAdmin bypass
  if (user.role === "superAdmin") return true;

  return permissions.includes(requiredPermission);
};
