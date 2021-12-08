import { CreatePaymentAccountInput } from "@ts-types/generated";
import PaymentAccount from "@repositories/payment-account";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { TENANT_ROUTES } from "@utils/loanoutes";

export interface IPaymentAccountCreateVariables {
  variables: { input: CreatePaymentAccountInput };
}

export const useCreatePaymentAccountMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IPaymentAccountCreateVariables) =>
      PaymentAccount.create(LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_CREATE, input),
    {
      onSuccess: () => {
        router.push(TENANT_ROUTES.PAYMENT_ACCOUNT);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_VIEW);
      },
    }
  );
};
