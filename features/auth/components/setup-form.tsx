"use client";

import { useState } from "react";
import { CreateUserForm } from "./create-user-form";
import { CreateOrganizationForm } from "./create-organization-form";

type SetupStage = "user" | "organization";

export function SetupForm() {
  const [stage, setStage] = useState<SetupStage>("user");
  const [createdUser, setCreatedUser] = useState<any>(null);

  const handleUserSuccess = (user: any) => {
    setCreatedUser(user);
    setStage("organization");
  };

  const handleBackToUser = () => {
    setStage("user");
    setCreatedUser(null);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {stage === "user" && <CreateUserForm onSuccess={handleUserSuccess} />}

      {stage === "organization" && createdUser && (
        <CreateOrganizationForm
          userName={createdUser.name}
          onBack={handleBackToUser}
        />
      )}
    </div>
  );
}
