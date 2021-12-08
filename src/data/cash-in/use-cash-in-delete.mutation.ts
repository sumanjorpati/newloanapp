import { useMutation, useQueryClient } from "react-query";
import CashIn from "@repositories/cashin";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteCashInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => CashIn.delete(`${LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_VIEW);
      },
    }
  );
};
