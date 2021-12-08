import Admin from "@repositories/admin";
import { useQuery } from "react-query";
import { Admin as TAdmin } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchAdmin = async (id: string) => {
  const { data } = await Admin.find(`${LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_VIEW_SINGLE}/${id}`);
  return { admin: data };
};

type IProps = {
  admin: TAdmin;
};

export const useAdminQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_VIEW_SINGLE, id], () => fetchAdmin(id));
};
