import { QueryParamsType,  SuperAdminsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Admin from "@repositories/admin";
import { AdminPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchAdmins = async ({
  queryKey,
}: QueryParamsType): Promise<{ admins: AdminPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
  } = params as SuperAdminsQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Admin.all(url);
  return {
    admins: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useAdminsQuery = (options: SuperAdminsQueryOptionsType) => {
  return useQuery<{ admins: AdminPaginator }, Error>(
    [LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_SEARCH, options],
    fetchAdmins,
    {
      keepPreviousData: true,
    }
  );
};

export { useAdminsQuery, fetchAdmins };
