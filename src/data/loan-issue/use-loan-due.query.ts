import LoanIssue from "@repositories/loanIssue";
import { useQuery } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchLoanDue = async (id: string) => {
  const { data } = await LoanIssue.find(`${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_DUE}/${id}`);
  return { loanDue: data };
};

type IProps = {
  loanDue: string;
};

export const useLoanDueQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_DUE, id], () => fetchLoanDue(id));
};
