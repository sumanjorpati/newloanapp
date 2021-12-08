import { useMutation, useQueryClient } from "react-query";
import Company from "@repositories/company";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteCompanyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Company.delete(`${LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_VIEW);
      },
    }
  );
};
