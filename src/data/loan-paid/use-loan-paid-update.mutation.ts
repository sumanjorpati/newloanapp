import { UpdateLoanPaidInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import LoanPaid from "@repositories/loanPaid";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";
export interface ILoanPaidUpdateVariables {
  variables: {
    id: string;
    input: UpdateLoanPaidInput;
  };
}

export const useUpdateLoanPaidMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: ILoanPaidUpdateVariables) =>
      LoanPaid.update(`${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(EMPLOYEE_ROUTES.LOAN_PAID);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_VIEW);
      },
    }
  );
};
