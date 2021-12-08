import { useQuery } from "react-query";
import CashOut from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentCashOuts = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_CASH_OUTS}`;
  const {
    data: { data },
  } = await CashOut.all(url);
  return { cashOut: { data}};
};

const useRecentCashOutsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_CASH_OUTS],
     fetchRecentCashOuts, 
     {
    keepPreviousData: true,
  });
};

export { useRecentCashOutsQuery, fetchRecentCashOuts };
