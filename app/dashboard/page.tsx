import { getCurrentUserWithRole } from "@/features/auth/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Calculator, FileText } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUserWithRole();
  const hasAccess = ["owner"].includes(user?.role ?? "");

  if (!user) {
    return null; // This should be handled by the layout
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to {user.organization.name}
        </h2>
        <p className="text-gray-600">
          Manage your mosque's financial activities with transparency and
          accountability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Financial Overview
            </CardTitle>
            <CardDescription>
              View current balance, income, and expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/financial">View Financials</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Expense Requests
            </CardTitle>
            <CardDescription>
              Review and approve expense requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/requests">Manage Requests</Link>
            </Button>
          </CardContent>
        </Card>

        {hasAccess && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                User Management
              </CardTitle>
              <CardDescription>Add and manage mosque members</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/admin/users">Manage Users</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard/transactions/new">Add Transaction</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/requests/new">Submit Request</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/reports">View Reports</Link>
            </Button>
            {hasAccess && (
              <Button variant="outline" asChild>
                <Link href="/dashboard/admin/settings">Settings</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
