import { useQuery } from "react-query";
import Customer from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentCustomers = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_CUSTOMERS}`;
  const {
    data: { data },
  } = await Customer.all(url);
  return { customer: { data}};
};

const useRecentCustomersQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_CUSTOMERS],
     fetchRecentCustomers, 
     {
    keepPreviousData: true,
  });
};

export { useRecentCustomersQuery, fetchRecentCustomers };
