import { UpdateLoanIssuedInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import LoanIssue from "@repositories/loanIssue";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";
export interface ILoanIssueUpdateVariables {
  variables: {
    id: string;
    input: UpdateLoanIssuedInput;
  };
}

export const useUpdateLoanIssueMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: ILoanIssueUpdateVariables) =>
      LoanIssue.update(`${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(EMPLOYEE_ROUTES.LOAN_ISSUE);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_VIEW);
      },
    }
  );
};
