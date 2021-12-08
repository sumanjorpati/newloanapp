import Company from "@repositories/company";
import { useQuery } from "react-query";
import { Company as TCompany } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchCompany = async (id: string) => {
  const { data } = await Company.find(`${LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_VIEW_SINGLE}/${id}`);
  return { company: data };
};

type IProps = {
  company: TCompany;
};

export const useCompanyQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_VIEW_SINGLE, id], () => fetchCompany(id));
};
