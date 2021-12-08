import { useMutation, useQueryClient } from "react-query";
import LoanPaid from "@repositories/loanPaid";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteLoanPaidMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => LoanPaid.delete(`${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_VIEW);
      },
    }
  );
};
