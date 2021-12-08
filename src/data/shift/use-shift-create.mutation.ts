import { CreateShiftInput } from "@ts-types/generated";
import Shift from "@repositories/shift";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { TENANT_ROUTES } from "@utils/loanoutes";

export interface IShiftCreateVariables {
  variables: { input: CreateShiftInput };
}

export const useCreateShiftMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IShiftCreateVariables) =>
      Shift.create(LOAN_API_ENDPOINTS.TENANT_SHIFTS_CREATE, input),
    {
      onSuccess: () => {
        router.push(TENANT_ROUTES.SHIFT);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_SHIFTS_VIEW);
      },
    }
  );
};
