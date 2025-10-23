import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import {
  ac,
  adminRole,
  memberRole,
  ownerRole,
  treasurerRole,
} from "./permissions";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    organizationClient({
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
