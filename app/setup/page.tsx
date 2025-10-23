import { redirect } from "next/navigation";
import { checkIfUsersExist } from "@/features/user-management/repositories/user-repository";
import { SetupForm } from "@/features/auth/components/setup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SetupPage() {
  const usersExist = await checkIfUsersExist();

  if (usersExist) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Setup Your Mosque
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your admin account and set up your mosque organization
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Initial Setup</CardTitle>
            <CardDescription>
              Follow the steps below to set up your mosque accounting system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SetupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
