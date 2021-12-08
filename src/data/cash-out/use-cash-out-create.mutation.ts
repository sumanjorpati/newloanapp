import { CreateCashOutInput } from "@ts-types/generated";
import CashOut from "@repositories/cashout";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";

export interface ICashOutCreateVariables {
  variables: { input: CreateCashOutInput };
}

export const useCreateCashOutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ICashOutCreateVariables) =>
      CashOut.create(LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_CREATE, input),
    {
      onSuccess: () => {
        router.push(EMPLOYEE_ROUTES.CASH_OUT);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_VIEW);
      },
    }
  );
};
