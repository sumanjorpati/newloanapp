import { QueryParamsType,  ClockOutsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import ClockOut from "@repositories/clockout";
import { ClockOutPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchClockOuts = async ({
  queryKey,
}: QueryParamsType): Promise<{ clockOuts: ClockOutPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
  } = params as ClockOutsQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await ClockOut.all(url);
  return {
    clockOuts: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useClockOutsQuery = (options: ClockOutsQueryOptionsType) => {
  return useQuery<{ clockOuts: ClockOutPaginator }, Error>(
    [LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_OUT_SEARCH, options],
    fetchClockOuts,
    {
      keepPreviousData: true,
    }
  );
};

export { useClockOutsQuery, fetchClockOuts };
