import { QueryParamsType,  LoanIssuedQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import LoanIssue from "@repositories/loanIssue";
import { LoanIssuedPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchLoanIssueds = async ({
  queryKey,
}: QueryParamsType): Promise<{ loanIssueds: LoanIssuedPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
    companyId,
  } = params as LoanIssuedQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&companyId=${companyId}`;
  const {
    data: { data, ...rest },
  } = await LoanIssue.all(url);
  return {
    loanIssueds: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useLoanIssuesQuery = (options: LoanIssuedQueryOptionsType) => {
  return useQuery<{ loanIssueds: LoanIssuedPaginator }, Error>(
    [LOAN_API_ENDPOINTS.EMPLOYEE_LOAN_ISSUED_VIEW, options],
    fetchLoanIssueds,
    {
      keepPreviousData: true,
    }
  );
};

export { useLoanIssuesQuery, fetchLoanIssueds };
