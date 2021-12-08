import { QueryParamsType,  PaymentAccountsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import PaymentAccount from "@repositories/payment-account";
import { PaymentAccountPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchPaymentAccounts = async ({
  queryKey,
}: QueryParamsType): Promise<{ paymentAccounts: PaymentAccountPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 10,
    orderBy = "createdDate",
    sortedBy = "DESC",
    companyId,
  } = params as PaymentAccountsQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&companyId=${companyId}`;
  const {
    data: { data, ...rest },
  } = await PaymentAccount.all(url);
  return {
    paymentAccounts: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const usePaymentAccountsQuery = (options: PaymentAccountsQueryOptionsType) => {
  return useQuery<{ paymentAccounts: PaymentAccountPaginator }, Error>(
    [LOAN_API_ENDPOINTS.TENANT_PAYMENT_ACCOUNTS_SEARCH, options],
    fetchPaymentAccounts,
    {
      keepPreviousData: true,
    }
  );
};

export { usePaymentAccountsQuery, fetchPaymentAccounts };
