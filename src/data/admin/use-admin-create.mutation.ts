import { CreateAdminInput } from "@ts-types/generated";
import Admin from "@repositories/admin";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { SUPERADMIN_ROUTES } from "@utils/loanoutes";

export interface IAdminCreateVariables {
  variables: { input: CreateAdminInput };
}

export const useCreateAdminMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IAdminCreateVariables) =>
      Admin.create(LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_CREATE, input),
    {
      onSuccess: () => {
        router.push(SUPERADMIN_ROUTES.ADMIN);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_CREATE);
      },
    }
  );
};
