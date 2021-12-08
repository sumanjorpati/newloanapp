import { UpdateCustomerInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Customer from "@repositories/customer";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { TENANT_ROUTES } from "@utils/loanoutes";
export interface ICustomerUpdateVariables {
  variables: {
    id: string;
    input: UpdateCustomerInput;
  };
}

export const useUpdateCustomerMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: ICustomerUpdateVariables) =>
      Customer.update(`${LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(TENANT_ROUTES.CUSTOMER);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_VIEW);
      },
    }
  );
};
