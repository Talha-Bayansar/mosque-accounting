import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserWithRoleMutation,
  getUsersForAdminMutation,
} from "../mutations/user-mutations";

/**
 * Hook for creating a user with a specific role
 */
export function useCreateUserWithRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserWithRoleMutation,
    onSuccess: () => {
      // Invalidate users list query
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Create user failed:", error);
    },
  });
}

/**
 * Hook for getting users for admin
 * Note: This could be converted to a query instead of mutation
 */
export function useGetUsersForAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getUsersForAdminMutation,
    onSuccess: (data) => {
      // Cache the users data
      queryClient.setQueryData(["users"], data.users);
    },
    onError: (error) => {
      console.error("Get users failed:", error);
    },
  });
}
