"use server";

import { db } from "@/db";
import { user, member, organization } from "@/db/schema/auth";
import { count } from "drizzle-orm";
import { eq } from "drizzle-orm";

export async function checkIfUsersExist(): Promise<boolean> {
  const users = await db.select({ count: count() }).from(user);
  return users[0].count > 0;
}

export interface UserWithRole {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
  organizationName: string;
  createdAt: Date;
}

export async function getAllUsers(
  organizationId: string
): Promise<UserWithRole[]> {
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: member.role,
      organizationId: organization.id,
      organizationName: organization.name,
      createdAt: member.createdAt,
    })
    .from(user)
    .innerJoin(member, eq(member.userId, user.id))
    .innerJoin(organization, eq(organization.id, member.organizationId))
    .where(eq(organization.id, organizationId))
    .orderBy(member.createdAt);

  return users;
}

export async function getUserWithRole(
  userId: string
): Promise<UserWithRole | null> {
  const userWithRole = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: member.role,
      organizationId: organization.id,
      organizationName: organization.name,
      createdAt: member.createdAt,
    })
    .from(user)
    .innerJoin(member, eq(member.userId, user.id))
    .innerJoin(organization, eq(organization.id, member.organizationId))
    .where(eq(user.id, userId))
    .limit(1);

  return userWithRole[0] || null;
}
