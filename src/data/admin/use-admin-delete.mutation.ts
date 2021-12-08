import { useMutation, useQueryClient } from "react-query";
import Admin from "@repositories/admin";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteAdminMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Admin.delete(`${LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_VIEW);
      },
    }
  );
};
