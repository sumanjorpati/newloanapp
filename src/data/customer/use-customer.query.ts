import Customer from "@repositories/customer";
import { useQuery } from "react-query";
import { Customer as TCustomer } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchCustomer = async (id: string) => {
  const { data } = await Customer.find(`${LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_VIEW_SINGLE}/${id}`);
  return { customer: data };
};

type IProps = {
  customer: TCustomer;
};

export const useCustomerQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.TENANT_CUSTOMERS_VIEW_SINGLE, id], () => fetchCustomer(id));
};
