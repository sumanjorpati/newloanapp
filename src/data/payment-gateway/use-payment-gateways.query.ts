import { QueryParamsType,  SuperAdminsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import PaymentGateway from "@repositories/payment-gateway";
import { PaymentGatewayPaginator } from "@ts-types/generated";
import { LOAN_API_ENDPOINTS } from "@utils/api/loan-endpoints";

const fetchPaymentGateways = async ({
  queryKey,
}: QueryParamsType): Promise<{ paymentGateways: PaymentGatewayPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 2,
    orderBy = "createdDate",
    sortedBy = "DESC",
  } = params as SuperAdminsQueryOptionsType;

  const searchString = text;
  const url = `${LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_SEARCH}?text=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await PaymentGateway.all(url);
  return {
    paymentGateways: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const usePaymentGatewaysQuery = (options: SuperAdminsQueryOptionsType) => {
  return useQuery<{ paymentGateways: PaymentGatewayPaginator }, Error>(
    [LOAN_API_ENDPOINTS.SUPERADMIN_PAYMENT_GATEWAYS_VIEW, options],
    fetchPaymentGateways,
    {
      keepPreviousData: true,
    }
  );
};

export { usePaymentGatewaysQuery, fetchPaymentGateways };
