import { useQuery } from "react-query";
import Shift from "@repositories/shift";
import { Shift as TShift } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchActiveShifts = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.TENANT_SHIFTS_ACTIVE_LIST}`;
  const { data } = await Shift.all(url);
  return { shifts: data as TShift[] };
};

type ShiftResponse = {
  shifts: TShift[];
};

const useShiftActiveList = () => {
  return useQuery<ShiftResponse, Error>(
    [LOAN_API_ENDPOINTS.TENANT_SHIFTS_ACTIVE_LIST],
    fetchActiveShifts,
    {
      keepPreviousData: true,
    }
  );
};

export { useShiftActiveList, fetchActiveShifts };
