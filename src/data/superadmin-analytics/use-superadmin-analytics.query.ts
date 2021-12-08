import Analytics from "@repositories/analytics";
import { useQuery } from "react-query";
import { SuperAdminAnalytics as TAnalytics } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchAnalytics = async () => {
  return await Analytics.analytics(LOAN_API_ENDPOINTS.SUPERADMIN_ANALYTICS);
};

export const useSuperAdminAnalyticsQuery = () => {
  return useQuery<TAnalytics, Error>([LOAN_API_ENDPOINTS.SUPERADMIN_ANALYTICS], fetchAnalytics);
};
