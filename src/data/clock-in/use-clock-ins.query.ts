import { QueryParamsType,  ClockInsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import ClockIn from "@repositories/clockin";
import { ClockInPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchClockIns = async ({
  queryKey,
}: QueryParamsType): Promise<{ clockIns: ClockInPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
  } = params as ClockInsQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await ClockIn.all(url);
  return {
    clockIns: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useClockInsQuery = (options: ClockInsQueryOptionsType) => {
  return useQuery<{ clockIns: ClockInPaginator }, Error>(
    [LOAN_API_ENDPOINTS.EMPLOYEE_CLOCK_IN_SEARCH, options],
    fetchClockIns,
    {
      keepPreviousData: true,
    }
  );
};

export { useClockInsQuery, fetchClockIns };
