import PaymentAccount from "@repositories/payment-account";
import { useQuery } from "react-query";
import { PaymentAccount as TPaymentAccount } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

export const fetchPaymentAccount = async (id: string) => {
  const { data } = await PaymentAccount.find(`${LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_VIEW_SINGLE}/${id}`);
  return { paymentAccount: data };
};

type IProps = {
  paymentAccount: TPaymentAccount;
};

export const usePaymentAccountQuery = (id: string) => {
  return useQuery<IProps, Error>([LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_VIEW_SINGLE, id], () => fetchPaymentAccount(id));
};
