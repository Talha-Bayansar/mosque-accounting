import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { organization } from "better-auth/plugins";
import { setActiveOrganization } from "@/features/auth/repositories/auth-repository";
import * as schema from "@/db/schema/auth";
import {
  ac,
  adminRole,
  memberRole,
  ownerRole,
  treasurerRole,
} from "./permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          await setActiveOrganization(session);
        },
      },
    },
  },
  plugins: [
    organization({
      ac: ac,
      roles: {
        treasurer: treasurerRole,
        member: memberRole,
        admin: adminRole,
        owner: ownerRole,
      },
    }),
  ],
});
