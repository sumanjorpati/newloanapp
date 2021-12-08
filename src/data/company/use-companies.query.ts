import { useQuery } from "react-query";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";
import Company from "@repositories/company";
import {Company as TCompany} from "@ts-types/generated"

type IProps = {
    data: Array<TCompany>
};
const fetchCompanies = async ():Promise<{companies:IProps}> => {
  
  const url = `${LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_VIEW}`;
  const {
    data
  } = await Company.find(url);
  return {
    companies: {
      data
    },
  };
};
const useCompaniesQuery = () => {
  return useQuery<{companies: IProps},Error>(
    [LOAN_API_ENDPOINTS.SUPERADMIN_COMPANIES_VIEW],
    fetchCompanies,
    {
      keepPreviousData: true,
    }
  );
};

export { useCompaniesQuery, fetchCompanies };
