import { useMutation, useQueryClient } from "react-query";
import ClockOut from "@repositories/clockout";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteClockOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => ClockOut.delete(`${LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_VIEW);
      },
    }
  );
};
