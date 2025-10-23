"use client";

import { CreateUserForm } from "@/features/user-management/components/create-user-form";
import { UsersList } from "@/features/user-management/components/users-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function AdminUsersPage() {
  const { data: organization } = authClient.useActiveOrganization();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>
              Create a new member for your mosque organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateUserForm />
          </CardContent>
        </Card>

        <div>
          <UsersList users={organization?.members ?? []} />
        </div>
      </div>
    </div>
  );
}
