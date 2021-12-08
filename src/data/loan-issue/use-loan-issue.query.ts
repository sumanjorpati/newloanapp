import LoanIssue from "@repositories/loanIssue";
import { useQuery } from "react-query";
import { LoanIssued as TLoanIssued } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchLoanIssue = async (id: string) => {
  const { data } = await LoanIssue.find(`${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_VIEW_SINGLE}/${id}`);
  return { loanIssued: data };
};

type IProps = {
  loanIssued: TLoanIssued;
};

export const useLoanIssueQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_VIEW_SINGLE, id], () => fetchLoanIssue(id));
};
