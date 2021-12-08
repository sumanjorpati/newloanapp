import { UpdateClockInInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ClockIn from "@repositories/clockin";
import { useTranslation } from "next-i18next";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { useRouter } from "next/router";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";
export interface IClockInUpdateVariables {
  variables: {
    id: string;
    input: UpdateClockInInput;
  };
}

export const useUpdateClockInMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router  = useRouter();
  return useMutation(
    ({ variables: { id, input } }: IClockInUpdateVariables) =>
      ClockIn.update(`${LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_UPDATE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
        router.push(EMPLOYEE_ROUTES.CLOCK_IN);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_VIEW);
      },
    }
  );
};
