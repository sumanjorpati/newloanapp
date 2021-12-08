import { ClockInOutInput } from "@ts-types/generated";
import { useMutation } from "react-query";
import User from "@repositories/user";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export interface IClockInOutVariables {
  variables: ClockInOutInput;
}

export const useClockInMutation = () => {
  return useMutation(({ variables }: IClockInOutVariables) =>
    User.clockin(LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_CREATE, variables)
  );
};
