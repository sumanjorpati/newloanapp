import { CreateCashInInput } from "@ts-types/generated";
import CashIn from "@repositories/cashin";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";

export interface ICashInCreateVariables {
  variables: { input: CreateCashInInput };
}

export const useCreateCashInMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ICashInCreateVariables) =>
      CashIn.create(LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_CREATE, input),
    {
      onSuccess: () => {
        router.push(EMPLOYEE_ROUTES.CASH_IN);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_VIEW);
      },
    }
  );
};
