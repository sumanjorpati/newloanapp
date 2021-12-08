import { useQuery } from "react-query";
import Employee from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentEmployees = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_EMPLOYEES}`;
  const {
    data: { data },
  } = await Employee.all(url);
  return { employee: { data}};
};

const useRecentEmployeesQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_EMPLOYEES],
     fetchRecentEmployees, 
     {
    keepPreviousData: true,
  });
};

export { useRecentEmployeesQuery, fetchRecentEmployees };
