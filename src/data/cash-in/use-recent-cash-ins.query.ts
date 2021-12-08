import { useQuery } from "react-query";
import CashIn from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentCashIns = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_CASH_INS}`;
  const {
    data: { data },
  } = await CashIn.all(url);
  return { cashIn: { data}};
};

const useRecentCashInsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_CASH_INS],
     fetchRecentCashIns, 
     {
    keepPreviousData: true,
  });
};

export { useRecentCashInsQuery, fetchRecentCashIns };
