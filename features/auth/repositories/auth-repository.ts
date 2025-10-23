"use server";

import { db } from "@/db";
import { user, member, organization, session } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { Session } from "better-auth";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface CreateOrganizationData {
  name: string;
  slug: string;
}

export async function createUser(data: CreateUserData) {
  // Use better-auth's built-in user creation
  const result = await auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
    },
    headers: new Headers(),
  });

  if (!result.user) {
    throw new Error("Failed to create user");
  }

  return result.user;
}

export async function getUserByEmail(email: string) {
  const userRecord = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  return userRecord[0] || null;
}

export async function countUsers(): Promise<number> {
  const result = await db.select({ count: user.id }).from(user);

  return result.length;
}

export async function setActiveOrganization(sessionData: Session) {
  const memberships = await db
    .select()
    .from(member)
    .where(eq(member.userId, sessionData.userId))
    .limit(1);

  if (memberships.length === 0) {
    return;
  }

  await db
    .update(session)
    .set({
      activeOrganizationId: memberships[0].organizationId,
    })
    .where(eq(session.id, sessionData.id));
}

export async function createOrganization(data: CreateOrganizationData) {
  const newOrg = await db
    .insert(organization)
    .values({
      id: crypto.randomUUID(),
      name: data.name,
      slug: data.slug,
      createdAt: new Date(),
    })
    .returning();

  return newOrg[0];
}

/**
 * Get a minimal organization object by id.
 * Only returns id, name, and slug fields.
 */
export async function getOrganizationMinimal(organizationId: string) {
  const org = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
    })
    .from(organization)
    .where(eq(organization.id, organizationId))
    .limit(1);

  return org[0] ?? null;
}
