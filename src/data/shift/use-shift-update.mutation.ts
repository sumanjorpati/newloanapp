import { UpdateShiftInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Shift from "@repositories/shift";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { TENANT_ROUTES } from "@utils/loanoutes";
export interface IShiftUpdateVariables {
  variables: {
    id: string;
    input: UpdateShiftInput;
  };
}

export const useUpdateShiftMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: IShiftUpdateVariables) =>
      Shift.update(`${LOAN_API_ENDPOINTS.TENANT_SHIFTS_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(TENANT_ROUTES.SHIFT);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.TENANT_SHIFTS_VIEW);
      },
    }
  );
};
