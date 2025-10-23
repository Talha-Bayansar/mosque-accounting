"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useCreateUserWithRole } from "../hooks/use-user-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

const createUserSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "treasurer", "member"]),
});

export function CreateUserForm() {
  const createUserMutation = useCreateUserWithRole();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "member" as "admin" | "treasurer" | "member",
    },
    validators: {
      onChange: createUserSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createUserMutation.mutateAsync({
          name: value.name,
          email: value.email,
          password: value.password,
          role: value.role,
        });

        // Reset form on success
        form.reset();
      } catch (err) {
        form.setFieldMeta("name", (prev) => ({
          ...prev,
          errors: [
            err instanceof Error ? err.message : "Failed to create user",
          ],
        }));
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
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
                  disabled={
                    form.state.isSubmitting || createUserMutation.isPending
                  }
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((err) => err?.message || "Invalid value")
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
                  disabled={
                    form.state.isSubmitting || createUserMutation.isPending
                  }
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((err) => err?.message || "Invalid value")
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
                  disabled={
                    form.state.isSubmitting || createUserMutation.isPending
                  }
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((err) => err?.message || "Invalid value")
                        .join(", ")}
                    </FieldError>
                  )}
              </Field>
            )}
          />
          <form.Field
            name="role"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(
                      value as "admin" | "treasurer" | "member"
                    )
                  }
                  disabled={
                    form.state.isSubmitting || createUserMutation.isPending
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((err) => err?.message || "Invalid value")
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
                  disabled={
                    !canSubmit || isSubmitting || createUserMutation.isPending
                  }
                >
                  {isSubmitting || createUserMutation.isPending
                    ? "Creating..."
                    : "Create User"}
                </Button>
              )}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
