import { QueryParamsType,  LoanPaidQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import LoanPaid from "@repositories/loanPaid";
import { LoanPaidPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchLoanPaids = async ({
  queryKey,
}: QueryParamsType): Promise<{ loanPaids: LoanPaidPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
    companyId,
  } = params as LoanPaidQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&companyId=${companyId}`;
  const {
    data: { data, ...rest },
  } = await LoanPaid.all(url);
  return {
    loanPaids: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useLoanPaidsQuery = (options: LoanPaidQueryOptionsType) => {
  return useQuery<{ loanPaids: LoanPaidPaginator }, Error>(
    [LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_PAID_VIEW, options],
    fetchLoanPaids,
    {
      keepPreviousData: true,
    }
  );
};

export { useLoanPaidsQuery, fetchLoanPaids };
