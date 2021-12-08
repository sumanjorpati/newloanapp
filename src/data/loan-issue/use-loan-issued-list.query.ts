import { useQuery } from "react-query";
import Customer from "@repositories/customer";
import { LoanIssued as TLoanIssued } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchActiveLoanIssued = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.TENANT_LOAN_ISSUED_ACTIVE_LIST}`;
  const { data } = await Customer.all(url);
  return { loanIssueds: data as TLoanIssued[] };
};

type IssueResponse = {
  loanIssueds: TLoanIssued[];
};

const useLoanIssuedsActiveList = () => {
  return useQuery<IssueResponse, Error>(
    [LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_ACTIVE_LIST],
    fetchActiveLoanIssued,
    {
      keepPreviousData: true,
    }
  );
};

export { useLoanIssuedsActiveList, fetchActiveLoanIssued };
