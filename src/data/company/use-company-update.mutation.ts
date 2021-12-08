import { UpdateCompanyInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Company from "@repositories/company";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
export interface ICompanyUpdateVariables {
  variables: {
    id: string;
    input: UpdateCompanyInput;
  };
}

export const useUpdateCompanyMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: ICompanyUpdateVariables) =>
      Company.update(`${LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES);
      },
    }
  );
};
