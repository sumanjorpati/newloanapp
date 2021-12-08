import { useMutation, useQueryClient } from "react-query";
import CashOut from "@repositories/cashout";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteCashOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => CashOut.delete(`${LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_VIEW);
      },
    }
  );
};
