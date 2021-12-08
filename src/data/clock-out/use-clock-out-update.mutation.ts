import { UpdateClockOutInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ClockOut from "@repositories/clockout";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";
export interface IClockOutUpdateVariables {
  variables: {
    id: string;
    input: UpdateClockOutInput;
  };
}

export const useUpdateClockOutMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: IClockOutUpdateVariables) =>
      ClockOut.update(`${LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(EMPLOYEE_ROUTES.CLOCK_OUT);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_VIEW);
      },
    }
  );
};
