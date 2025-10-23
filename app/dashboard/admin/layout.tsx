import { redirect } from "next/navigation";
import { getCurrentUserWithRole } from "@/features/auth/utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserWithRole();

  if (!user || !["owner"].includes(user.role)) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-gray-600">
          Manage users, settings, and organization configuration
        </p>
      </div>
      {children}
    </div>
  );
}
