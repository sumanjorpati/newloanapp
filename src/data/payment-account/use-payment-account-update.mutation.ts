import { UpdatePaymentAccountInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import PaymentAccount from "@repositories/payment-account";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { TENANT_ROUTES } from "@utils/loanoutes";
export interface IPaymentAccountUpdateVariables {
  variables: {
    id: string;
    input: UpdatePaymentAccountInput;
  };
}

export const useUpdatePaymentAccountMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: IPaymentAccountUpdateVariables) =>
      PaymentAccount.update(`${LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(TENANT_ROUTES.PAYMENT_ACCOUNT);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_VIEW);
      },
    }
  );
};
