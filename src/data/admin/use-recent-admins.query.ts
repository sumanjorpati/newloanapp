import { useQuery } from "react-query";
import Admin from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentAdmins = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_ADMINS}`;
  const {
    data: { data },
  } = await Admin.all(url);
  return { admin: { data}};
};

const useRecentAdminsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_ADMINS], fetchRecentAdmins, {
    
    keepPreviousData: true,
  });
};

export { useRecentAdminsQuery, fetchRecentAdmins };
