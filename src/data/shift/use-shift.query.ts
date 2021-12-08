import Shift from "@repositories/shift";
import { useQuery } from "react-query";
import { Shift as TShift } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchShift = async (id: string) => {
  const { data } = await Shift.find(`${LOAN_API_ENDPOINTS.TENANT_SHIFTS_VIEW_SINGLE}/${id}`);
  return { shift: data };
};

type IProps = {
  shift: TShift;
};

export const useShiftQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.TENANT_SHIFTS_VIEW_SINGLE, id], () => fetchShift(id));
};
