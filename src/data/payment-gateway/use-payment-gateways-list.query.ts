import { useQuery } from "react-query";
import PaymentGateway from "@repositories/payment-gateway";
import { PaymentGateway as TPaymentGateway } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchActivePaymentGateways = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_ACTIVE_LIST}`;
  const { data } = await PaymentGateway.all(url);
  return { paymentGateways: data as TPaymentGateway[] };
};

type PaymentGatewayResponse = {
  paymentGateways: TPaymentGateway[];
};

const usePaymentGatewaysActiveList = () => {
  return useQuery<PaymentGatewayResponse, Error>(
    [LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_ACTIVE_LIST],
    fetchActivePaymentGateways,
    {
      keepPreviousData: true,
    }
  );
};

export { usePaymentGatewaysActiveList, fetchActivePaymentGateways };
