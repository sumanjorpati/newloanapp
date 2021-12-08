import ClockIn from "@repositories/clockin";
import { useQuery } from "react-query";
import { ClockIn as TClockIn } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchClockIn = async (id: string) => {
  const { data } = await ClockIn.find(`${LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_VIEW_SINGLE}/${id}`);
  return { clockIns: data };
};

type IProps = {
  clockIns: TClockIn;
};

export const useClockInQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_VIEW_SINGLE, id], () => fetchClockIn(id));
};
