import { useMutation, useQueryClient } from "react-query";
import Customer from "@repositories/customer";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Customer.delete(`${LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_VIEW);
      },
    }
  );
};
