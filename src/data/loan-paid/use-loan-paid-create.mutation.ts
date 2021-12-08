import { CreateLoanPaidInput } from "@ts-types/generated";
import LoanPaid from "@repositories/loanPaid";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";

export interface ILoanPaidCreateVariables {
  variables: { input: CreateLoanPaidInput };
}

export const useCreateLoanPaidMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ILoanPaidCreateVariables) =>
      LoanPaid.create(LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_CREATE, input),
    {
      onSuccess: () => {
        router.push(EMPLOYEE_ROUTES.LOAN_PAID);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_VIEW);
      },
    }
  );
};
