import { useMutation, useQueryClient } from "react-query";
import ClockIn from "@repositories/clockin";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteClockInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => ClockIn.delete(`${LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_VIEW);
      },
    }
  );
};
