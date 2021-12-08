import { useQuery } from "react-query";
import LoanIssued from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentLoanIssueds = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_LOAN_ISSUED}`;
  const {
    data: { data },
  } = await LoanIssued.all(url);
  return { loanIssue: { data}};
};

const useRecentLoanIssuedsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_LOAN_ISSUED],
     fetchRecentLoanIssueds, 
     {
    keepPreviousData: true,
  });
};

export { useRecentLoanIssuedsQuery, fetchRecentLoanIssueds };
