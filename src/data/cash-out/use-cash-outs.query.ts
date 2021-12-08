import { QueryParamsType,  CashOutsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import CashOut from "@repositories/cashout";
import { CashOutPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchCashOuts = async ({
  queryKey,
}: QueryParamsType): Promise<{ cashOuts: CashOutPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
    companyId,
  } = params as CashOutsQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&companyId=${companyId}`;
  const {
    data: { data, ...rest },
  } = await CashOut.all(url);
  return {
    cashOuts: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useCashOutsQuery = (options: CashOutsQueryOptionsType) => {
  return useQuery<{ cashOuts: CashOutPaginator }, Error>(
    [LOAN_API_ENDPOINTS.EMPLOYEE_CASH_OUT_VIEW, options],
    fetchCashOuts,
    {
      keepPreviousData: true,
    }
  );
};

export { useCashOutsQuery, fetchCashOuts };
