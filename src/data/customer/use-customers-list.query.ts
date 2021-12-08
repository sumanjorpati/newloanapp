import { useQuery } from "react-query";
import Customer from "@repositories/customer";
import { Customer as TCustomer } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchActiveCustomers = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_ACTIVE_LIST}`;
  const { data } = await Customer.all(url);
  return { customers: data as TCustomer[] };
};

type CustomerResponse = {
  customers: TCustomer[];
};

const useCustomersActiveList = () => {
  return useQuery<CustomerResponse, Error>(
    [LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_ACTIVE_LIST],
    fetchActiveCustomers,
    {
      keepPreviousData: true,
    }
  );
};

export { useCustomersActiveList, fetchActiveCustomers };
