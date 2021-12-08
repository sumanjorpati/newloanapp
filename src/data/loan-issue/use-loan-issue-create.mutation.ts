import { CreateLoanIssuedInput } from "@ts-types/generated";
import LoanIssue from "@repositories/loanIssue";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";

export interface ILoanIssueCreateVariables {
  variables: { input: CreateLoanIssuedInput };
}

export const useCreateLoanIssueMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ILoanIssueCreateVariables) =>
      LoanIssue.create(LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_CREATE, input),
    {
      onSuccess: () => {
        router.push(EMPLOYEE_ROUTES.LOAN_ISSUE);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_VIEW);
      },
    }
  );
};
