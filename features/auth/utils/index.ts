// Session utilities
export {
  getCurrentUser,
  getCurrentUserWithRole,
  isCurrentUserAdmin,
} from "./session-utils";

// Auth guards
export {
  requireAuth,
  requireAdmin,
  requireRole,
  hasAnyRole,
} from "./auth-guards";

// Types
export interface UserWithRole {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
  organizationName: string;
}
