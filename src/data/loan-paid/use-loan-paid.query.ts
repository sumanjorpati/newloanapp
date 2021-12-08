import LoanPaid from "@repositories/loanPaid";
import { useQuery } from "react-query";
import { LoanPaid as TLoanPaid } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchLoanPaid = async (id: string) => {
  const { data } = await LoanPaid.find(`${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_VIEW_SINGLE}/${id}`);
  return { loanPaid: data };
};

type IProps = {
  loanPaid: TLoanPaid;
};

export const useLoanPaidQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_VIEW_SINGLE, id], () => fetchLoanPaid(id));
};
