import { QueryParamsType,  PaymentAccountsQueryOptionsType, QueryParamsFilterType, PaymentAccountsActiveListFilterOptionType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import PaymentAccount from "@repositories/payment-account";
import { PaymentAccountPaginator, PaymentAccount as TPaymentAccount, PaymentAccountList } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchPaymentAccountsActiveList = async ({
  queryKey
}: QueryParamsFilterType): Promise<{ paymentAccounts: PaymentAccountList }> => {
  const [_key, params] = queryKey;
  const {
    gatewayId,
    companyId,
  } = params as PaymentAccountsActiveListFilterOptionType;

  const gId = gatewayId;
  const cId = companyId
  const url = `${LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_ACTIVE_LIST}?gatewayId=${gId}&companyId=${cId}`;
  const {
    data: { data},
  } = await PaymentAccount.all(url);
  console.log('data',data)
  return {
    paymentAccounts: {
      data
    },
  };
};

const usePaymentAccountsListQuery = (options: PaymentAccountsActiveListFilterOptionType) => {
  return useQuery<{ paymentAccounts: PaymentAccountList}, Error>(
    [LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_ACTIVE_LIST, options],
    fetchPaymentAccountsActiveList,
    {
      keepPreviousData: true,
    }
  );
};

export { usePaymentAccountsListQuery, fetchPaymentAccountsActiveList };
