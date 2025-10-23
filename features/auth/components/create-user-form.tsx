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

const userSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface CreateUserFormProps {
  onSuccess: (user: any) => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: userSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        const result = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
        });

        if (!!result) {
          onSuccess(result);
        }
      } catch (err) {
        form.setFieldMeta("name", (prev) => ({
          ...prev,
          errors: [err instanceof Error ? err.message : "User creation failed"],
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
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  id={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={form.state.isSubmitting || isLoading}
                  placeholder="Enter your full name"
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
          <form.Field
            name="email"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={form.state.isSubmitting || isLoading}
                  placeholder="Enter your email address"
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
          <form.Field
            name="password"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={form.state.isSubmitting || isLoading}
                  placeholder="Enter a secure password"
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
          <Field>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!canSubmit || isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading
                    ? "Creating Account..."
                    : "Create Admin Account"}
                </Button>
              )}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
