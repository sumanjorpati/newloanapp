import { useMutation, useQueryClient } from "react-query";
import LoanIssue from "@repositories/loanIssue";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteLoanIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => LoanIssue.delete(`${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_VIEW);
      },
    }
  );
};
