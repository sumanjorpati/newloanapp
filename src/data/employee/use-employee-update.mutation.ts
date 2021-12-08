import { UpdateEmployeeInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Employee from "@repositories/employee";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { TENANT_ROUTES } from "@utils/loanoutes";
export interface IEmployeeUpdateVariables {
  variables: {
    id: string;
    input: UpdateEmployeeInput;
  };
}

export const useUpdateEmployeeMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: IEmployeeUpdateVariables) =>
      Employee.update(`${LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(TENANT_ROUTES.EMPLOYEE);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_VIEW);
      },
    }
  );
};
