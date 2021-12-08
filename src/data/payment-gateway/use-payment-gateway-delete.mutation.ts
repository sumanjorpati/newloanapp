import { useMutation, useQueryClient } from "react-query";
import PaymentGateway from "@repositories/payment-gateway";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const useDeletePaymentGatewayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => PaymentGateway.delete(`${LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_DELETE}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_VIEW);
      },
    }
  );
};
