import { CreatePaymentGatewayInput } from "@ts-types/generated";
import PaymentGateway from "@repositories/payment-gateway";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { SUPERADMIN_ROUTES } from "@utils/loanoutes";

export interface IPaymentGatewayCreateVariables {
  variables: { input: CreatePaymentGatewayInput };
}

export const useCreatePaymentGatewayMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IPaymentGatewayCreateVariables) =>
      PaymentGateway.create(LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_CREATE, input),
    {
      onSuccess: () => {
        router.push(SUPERADMIN_ROUTES.PAYMENT_GATEWAY);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_VIEW);
      },
    }
  );
};
