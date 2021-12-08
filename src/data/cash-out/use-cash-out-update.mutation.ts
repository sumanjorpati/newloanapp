import { UpdateCashOutInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import CashOut from "@repositories/cashout";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";
export interface ICashOutUpdateVariables {
  variables: {
    id: string;
    input: UpdateCashOutInput;
  };
}

export const useUpdateCashOutMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: ICashOutUpdateVariables) =>
      CashOut.update(`${LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(EMPLOYEE_ROUTES.CASH_OUT);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_VIEW);
      },
    }
  );
};
