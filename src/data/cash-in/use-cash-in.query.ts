import CashIn from "@repositories/cashin";
import { useQuery } from "react-query";
import { CashIn as TCashIn } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchCashIn = async (id: string) => {
  const { data } = await CashIn.find(`${LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_VIEW_SINGLE}/${id}`);
  return { cashIns: data };
};

type IProps = {
  cashIns: TCashIn;
};

export const useCashInQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_VIEW_SINGLE, id], () => fetchCashIn(id));
};
