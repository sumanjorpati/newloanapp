import { CreateClockOutInput } from "@ts-types/generated";
import ClockOut from "@repositories/clockout";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";

export interface IClockOutCreateVariables {
  variables: { input: CreateClockOutInput };
}

export const useCreateClockOutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IClockOutCreateVariables) =>
      ClockOut.create(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_CREATE, input),
    {
      onSuccess: () => {
        router.push(EMPLOYEE_ROUTES.CLOCK_OUT);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_VIEW);
      },
    }
  );
};
