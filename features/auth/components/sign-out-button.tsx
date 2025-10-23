"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={signOut} disabled={isLoading}>
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
