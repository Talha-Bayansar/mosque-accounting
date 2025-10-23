"use server";

import { z } from "zod";
import { getCurrentUserWithRole } from "@/features/auth/utils";
import { createUser } from "@/features/auth/repositories/auth-repository";
import { getAllUsers } from "../repositories/user-repository";
import { authClient } from "@/lib/auth-client";
import { Role } from "@/lib/permissions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Types for mutation inputs
export interface CreateUserWithRoleInput {
  name: string;
  email: string;
  password: string;
  role: "admin" | "treasurer" | "member";
}

// Validation schema
const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "treasurer", "member"]),
});

/**
 * Create user with role mutation
 * Returns success data instead of redirecting
 */
export async function createUserWithRoleMutation(
  input: CreateUserWithRoleInput
) {
  const currentUser = await getCurrentUserWithRole();

  const hasPermission = authClient.organization.checkRolePermission({
    permission: {
      member: ["create"],
    },
    role: currentUser!.role as Role,
  });

  if (!hasPermission) {
    throw new Error("You are not authorized to create users");
  }

  // Validate input
  const validatedData = createUserSchema.parse(input);

  try {
    // Create the user
    const newUser = await createUser({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });

    await auth.api.addMember({
      body: {
        userId: newUser.id,
        role: validatedData.role,
        organizationId: currentUser!.organization.id,
      },
      headers: await headers(),
    });

    return {
      success: true,
      userId: newUser.id,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Create user error:", error);
    throw new Error("Failed to create user");
  }
}

/**
 * Get users for admin mutation
 * This could be converted to a query instead of mutation
 */
export async function getUsersForAdminMutation() {
  const currentUser = await getCurrentUserWithRole();

  const hasPermission = authClient.organization.checkRolePermission({
    permission: {
      member: ["create"],
    },
    role: currentUser!.role as Role,
  });

  if (!hasPermission) {
    throw new Error("You are not authorized to get users");
  }

  try {
    const users = await getAllUsers(currentUser!.organization.id);
    return {
      success: true,
      users,
    };
  } catch (error) {
    console.error("Get users error:", error);
    throw new Error("Failed to fetch users");
  }
}
