import { useMutation, useQueryClient } from "react-query";
import Shift from "@repositories/shift";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteShiftMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Shift.delete(`${LOAN_API_ENDPOINTS.TENANT_SHIFTS_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_SHIFTS_VIEW);
      },
    }
  );
};
