import Analytics from "@repositories/analytics";
import { useQuery } from "react-query";
import { TenantAnalytics as TAnalytics } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchTenantAnalytics = async () => {
  return await Analytics.analytics(LOAN_API_ENDPOINTS.TENANT_ANALYTICS);
};

export const useTenantAnalyticsQuery = () => {
  return useQuery<TAnalytics, Error>([LOAN_API_ENDPOINTS.TENANT_ANALYTICS], fetchTenantAnalytics);
};
