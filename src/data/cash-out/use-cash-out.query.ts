import CashOut from "@repositories/cashout";
import { useQuery } from "react-query";
import { CashOut as TCashOut } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchCashOut = async (id: string) => {
  const { data } = await CashOut.find(`${LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_VIEW_SINGLE}/${id}`);
  return { cashOuts: data };
};

type IProps = {
  cashOuts: TCashOut;
};

export const useCashOutQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_VIEW_SINGLE, id], () => fetchCashOut(id));
};
