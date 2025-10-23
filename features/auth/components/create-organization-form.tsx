"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const organizationSchema = z.object({
  name: z.string().min(1, "Mosque name is required"),
});

interface CreateOrganizationFormProps {
  userName: string;
  onBack: () => void;
}

export function CreateOrganizationForm({
  userName,
  onBack,
}: CreateOrganizationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onChange: organizationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        await authClient.organization.create({
          name: value.name,
          slug: value.name.toLowerCase().replace(/ /g, "-"),
        });

        router.push("/dashboard");
      } catch (err) {
        form.setFieldMeta("name", (prev) => ({
          ...prev,
          errors: [
            err instanceof Error ? err.message : "Organization creation failed",
          ],
        }));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-full max-w-md space-y-6"
    >
      <FieldSet>
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Mosque Name</FieldLabel>
                <Input
                  id={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={form.state.isSubmitting || isLoading}
                  placeholder="Enter your mosque name"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                    </FieldError>
                  )}
              </Field>
            )}
          />
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={form.state.isSubmitting || isLoading}
              className="flex-1"
            >
              Back
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!canSubmit || isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading
                    ? "Creating Organization..."
                    : "Create Organization"}
                </Button>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
