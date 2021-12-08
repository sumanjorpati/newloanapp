import { useMutation, useQueryClient } from "react-query";
import PaymentAccount from "@repositories/payment-account";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeletePaymentAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => PaymentAccount.delete(`${LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_VIEW);
      },
    }
  );
};
