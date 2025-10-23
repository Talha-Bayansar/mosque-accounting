import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getOrganizationMinimal } from "../repositories/auth-repository";

/**
 * Get the current authenticated user from the session
 * Uses better-auth's built-in session management
 */
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    organizationId: session.session.activeOrganizationId!,
  };
}

/**
 * Get current user with organization and role information
 * Uses better-auth's organization plugin
 */
export async function getCurrentUserWithRole() {
  try {
    const activeMember = await auth.api.getActiveMember({
      headers: await headers(),
    });

    const organization = await getOrganizationMinimal(
      activeMember?.organizationId!
    );

    if (!activeMember || !organization) {
      return null;
    }

    return {
      id: activeMember.user.id,
      name: activeMember.user.name,
      email: activeMember.user.email,
      role: activeMember.role,
      organization,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Check if the current user is an admin
 * Uses better-auth's organization plugin
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const userWithRole = await getCurrentUserWithRole();
  return userWithRole?.role === "admin";
}
