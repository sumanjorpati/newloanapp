import { CreateClockInInput } from "@ts-types/generated";
import ClockIn from "@repositories/clockin";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";

export interface IClockInCreateVariables {
  variables: { input: CreateClockInInput };
}

export const useCreateClockInMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IClockInCreateVariables) =>
      ClockIn.create(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_CREATE, input),
    {
      onSuccess: () => {
        router.push(EMPLOYEE_ROUTES.CLOCK_IN);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_VIEW);
      },
    }
  );
};
