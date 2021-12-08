import { useMutation, useQueryClient } from "react-query";
import Employee from "@repositories/employee";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeleteEmployeeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Employee.delete(`${LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_VIEW);
      },
    }
  );
};
