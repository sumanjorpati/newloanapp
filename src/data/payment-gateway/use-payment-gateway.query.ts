import PaymentGateway from "@repositories/payment-gateway";
import { useQuery } from "react-query";
import { PaymentGateway as TPaymentGateway } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchPaymentGateway = async (id: string) => {
  const { data } = await PaymentGateway.find(`${LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_VIEW_SINGLE}/${id}`);
  return { paymentGateway: data };
};

type IProps = {
  paymentGateway: TPaymentGateway;
};

export const usePaymentGatewayQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.SUPERADMIN_ADMINS_VIEW_SINGLE, id], () => fetchPaymentGateway(id));
};
