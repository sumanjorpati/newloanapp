import { QueryParamsType,  CashInsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import CashIn from "@repositories/cashin";
import { CashInPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchCashIns = async ({
  queryKey,
}: QueryParamsType): Promise<{ cashIns: CashInPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
    companyId,
  } = params as CashInsQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&companyId=${companyId}`;
  const {
    data: { data, ...rest },
  } = await CashIn.all(url);
  return {
    cashIns: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useCashInsQuery = (options: CashInsQueryOptionsType) => {
  return useQuery<{ cashIns: CashInPaginator }, Error>(
    [LOAN_API_ENDPOINTS.EMPLOYEE_CASH_IN_VIEW, options],
    fetchCashIns,
    {
      keepPreviousData: true,
    }
  );
};

export { useCashInsQuery, fetchCashIns };
