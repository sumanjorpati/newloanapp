import Employee from "@repositories/employee";
import { useQuery } from "react-query";
import { Employee as TEmployee } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchEmployee = async (id: string) => {
  const { data } = await Employee.find(`${LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_VIEW_SINGLE}/${id}`);
  return { employee: data };
};

type IProps = {
  employee: TEmployee;
};

export const useEmployeeQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.TENANT_EMPLOYEES_VIEW_SINGLE, id], () => fetchEmployee(id));
};
