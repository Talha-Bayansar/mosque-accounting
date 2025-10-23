import {
  getCurrentUser,
  getCurrentUserWithRole,
  isCurrentUserAdmin,
} from "./session-utils";

/**
 * Require authentication - throws if user is not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

/**
 * Require admin role - throws if user is not authenticated or not admin
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    throw new Error("Forbidden: Admin access required");
  }

  return user;
}

/**
 * Require specific role - throws if user doesn't have the required role
 */
export async function requireRole(requiredRole: string) {
  const userWithRole = await getCurrentUserWithRole();
  if (!userWithRole) {
    throw new Error("Unauthorized");
  }

  if (userWithRole.role !== requiredRole) {
    throw new Error(`Forbidden: ${requiredRole} access required`);
  }

  return userWithRole;
}

/**
 * Check if user has any of the specified roles
 */
export async function hasAnyRole(roles: string[]): Promise<boolean> {
  const userWithRole = await getCurrentUserWithRole();
  if (!userWithRole) {
    return false;
  }

  return roles.includes(userWithRole.role);
}
