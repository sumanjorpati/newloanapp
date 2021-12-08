import { CreateCustomerInput } from "@ts-types/generated";
import Customer from "@repositories/customer";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { TENANT_ROUTES } from "@utils/loanoutes";

export interface ICustomerCreateVariables {
  variables: { input: CreateCustomerInput };
}

export const useCreateCustomerMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ICustomerCreateVariables) =>
      Customer.create(LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_CREATE, input),
    {
      onSuccess: () => {
        router.push(TENANT_ROUTES.CUSTOMER);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_VIEW);
      },
    }
  );
};
