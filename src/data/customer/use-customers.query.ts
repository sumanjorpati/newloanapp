import { QueryParamsType,  CustomersQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Customer from "@repositories/customer";
import { CustomerPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchCustomers = async ({
  queryKey,
}: QueryParamsType): Promise<{ customers: CustomerPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
    companyId,
  } = params as CustomersQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&companyId=${companyId}`;
  const {
    data: { data, ...rest },
  } = await Customer.all(url);
  return {
    customers: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useCustomersQuery = (options: CustomersQueryOptionsType) => {
  return useQuery<{ customers: CustomerPaginator }, Error>(
    [LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_SEARCH, options],
    fetchCustomers,
    {
      keepPreviousData: true,
    }
  );
};

export { useCustomersQuery, fetchCustomers };
