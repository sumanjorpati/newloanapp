import ClockOut from "@repositories/clockout";
import { useQuery } from "react-query";
import { ClockOut as TClockOut } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchClockOut = async (id: string) => {
  const { data } = await ClockOut.find(`${LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_VIEW_SINGLE}/${id}`);
  return { clockOuts: data };
};

type IProps = {
  clockOuts: TClockOut;
};

export const useClockOutQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_VIEW_SINGLE, id], () => fetchClockOut(id));
};
