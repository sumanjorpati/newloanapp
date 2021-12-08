import { useQuery } from "react-query";
import PaymentGateway from "@repositories/payment-gateway";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentPaymentGateways = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_PAYMENT_GATEWAYS}`;
  const {
    data: { data },
  } = await PaymentGateway.all(url);
  return { paymentGateways: { data}};
};

const useRecentPaymentGatewaysQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_PAYMENT_GATEWAYS], fetchRecentPaymentGateways, {
    
    keepPreviousData: true,
  });
};

export { useRecentPaymentGatewaysQuery, fetchRecentPaymentGateways };
