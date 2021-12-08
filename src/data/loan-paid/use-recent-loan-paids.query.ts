import { useQuery } from "react-query";
import LoanPaid from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentLoanPaids = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_LOAN_PAID}`;
  const {
    data: { data },
  } = await LoanPaid.all(url);
  return { loanPaid: { data}};
};

const useRecentLoanPaidsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_LOAN_PAID],
     fetchRecentLoanPaids, 
     {
    keepPreviousData: true,
  });
};

export { useRecentLoanPaidsQuery, fetchRecentLoanPaids };
