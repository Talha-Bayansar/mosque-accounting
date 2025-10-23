import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  memberAc,
  adminAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);

export const memberRole = ac.newRole({
  ...memberAc.statements,
});
export const adminRole = ac.newRole({
  ...adminAc.statements,
});
export const ownerRole = ac.newRole({
  ...ownerAc.statements,
});

export const treasurerRole = ac.newRole({
  ...memberAc.statements,
});

export type Role = "treasurer" | "member" | "admin" | "owner";
