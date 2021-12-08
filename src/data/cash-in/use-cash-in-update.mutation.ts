import { UpdateCashInInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import CashIn from "@repositories/cashin";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";
export interface ICashInUpdateVariables {
  variables: {
    id: string;
    input: UpdateCashInInput;
  };
}

export const useUpdateCashInMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: ICashInUpdateVariables) =>
      CashIn.update(`${LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(EMPLOYEE_ROUTES.CASH_IN);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_VIEW);
      },
    }
  );
};
