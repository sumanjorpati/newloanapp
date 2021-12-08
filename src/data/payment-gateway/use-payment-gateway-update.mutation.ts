import { UpdatePaymentGatewayInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import PaymentGateway from "@repositories/payment-gateway";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { SUPERADMIN_ROUTES } from "@utils/loanoutes";
export interface IPaymentGatewayUpdateVariables {
  variables: {
    id: string;
    input: UpdatePaymentGatewayInput;
  };
}

export const useUpdatePaymentGatewayMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: IPaymentGatewayUpdateVariables) =>
      PaymentGateway.update(`${LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(SUPERADMIN_ROUTES.PAYMENT_GATEWAY);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_VIEW);
      },
    }
  );
};
