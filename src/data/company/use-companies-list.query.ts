import { useQuery } from "react-query";
import Company from "@repositories/company";
import { CompanyList as TCompanyList } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchActiveCompanies = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_ACTIVE_LIST}`;
  const { data } = await Company.all(url);
  return { companies: data as TCompanyList[] };
};

type CompanyResponse = {
  companies: TCompanyList[];
};

const useCompaniesActiveList = () => {
  return useQuery<CompanyResponse, Error>(
    [LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_ACTIVE_LIST],
    fetchActiveCompanies,
    {
      keepPreviousData: true,
    }
  );
};

export { useCompaniesActiveList, fetchActiveCompanies };
