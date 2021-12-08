import { QueryParamsType,  ShiftsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Shift from "@repositories/shift";
import { ShiftPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchShifts = async ({
  queryKey,
}: QueryParamsType): Promise<{ shifts: ShiftPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
    companyId,
  } = params as ShiftsQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.TENANT_SHIFTS_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&companyId=${companyId}`;
  const {
    data: { data, ...rest },
  } = await Shift.all(url);
  return {
    shifts: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useShiftsQuery = (options: ShiftsQueryOptionsType) => {
  return useQuery<{ shifts: ShiftPaginator }, Error>(
    [LOAN_API_ENDPOINTS.TENANT_SHIFTS_SEARCH, options],
    fetchShifts,
    {
      keepPreviousData: true,
    }
  );
};

export { useShiftsQuery, fetchShifts };
