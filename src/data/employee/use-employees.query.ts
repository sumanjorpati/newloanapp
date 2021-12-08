import { QueryParamsType,  EmployeesQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Employee from "@repositories/employee";
import { EmployeePaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchEmployees = async ({
  queryKey,
}: QueryParamsType): Promise<{ employees: EmployeePaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
    companyId,
  } = params as EmployeesQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&companyId=${companyId}`;
  const {
    data: { data, ...rest },
  } = await Employee.all(url);
  return {
    employees: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useEmployeesQuery = (options: EmployeesQueryOptionsType) => {
  return useQuery<{ employees: EmployeePaginator }, Error>(
    [LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_SEARCH, options],
    fetchEmployees,
    {
      keepPreviousData: true,
    }
  );
};

export { useEmployeesQuery, fetchEmployees };
