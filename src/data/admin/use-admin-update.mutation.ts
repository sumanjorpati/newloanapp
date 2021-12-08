import { UpdateAdminInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Admin from "@repositories/admin";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { SUPERADMIN_ROUTES } from "@utils/loanoutes";
export interface IAdminUpdateVariables {
  variables: {
    id: string;
    input: UpdateAdminInput;
  };
}

export const useUpdateAdminMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: IAdminUpdateVariables) =>
      Admin.update(`${LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(SUPERADMIN_ROUTES.ADMIN);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_VIEW);
      },
    }
  );
};
