import { CreateEmployeeInput } from "@ts-types/generated";
import Employee from "@repositories/employee";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { TENANT_ROUTES } from "@utils/loanoutes";

export interface IEmployeeCreateVariables {
  variables: { input: CreateEmployeeInput };
}

export const useCreateEmployeeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IEmployeeCreateVariables) =>
      Employee.create(LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_CREATE, input),
    {
      onSuccess: () => {
        router.push(TENANT_ROUTES.EMPLOYEE);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_VIEW);
      },
    }
  );
};
