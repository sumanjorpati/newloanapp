import Layout from "@components/layouts/superadmin";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdatePaymentGatewayForm from "@components/paymentgateway/payment-gateway-form";
import { adminOnly } from "@utils/auth-utils";
import { usePaymentGatewayQuery } from "@data/payment-gateway/use-payment-gateway.query";

export default function UpdatePaymentGatewayPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = usePaymentGatewayQuery(query.paymentGatewayId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-payment-gateway")}
        </h1>
      </div>

      <CreateOrUpdatePaymentGatewayForm initialValues={data?.paymentGateway} />
    </>
  );
}
UpdatePaymentGatewayPage.authenticate = {
  permissions: adminOnly,
};
UpdatePaymentGatewayPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
