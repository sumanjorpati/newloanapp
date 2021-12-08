import { useQuery } from "react-query";
import PaymentAccount from "@repositories/type";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchRecentPaymentAccounts = async () => {
  
  const url = `${LOAN_API_ENDPOINTS.RECENT_PAYMENT_ACCOUNTS}`;
  const {
    data: { data },
  } = await PaymentAccount.all(url);
  return { paymentAccounts: { data}};
};

const useRecentPaymentAccountsQuery = () => {
  return useQuery<any, Error>([LOAN_API_ENDPOINTS.RECENT_PAYMENT_ACCOUNTS],
     fetchRecentPaymentAccounts, 
     {
    keepPreviousData: true,
  });
};

export { useRecentPaymentAccountsQuery, fetchRecentPaymentAccounts };
