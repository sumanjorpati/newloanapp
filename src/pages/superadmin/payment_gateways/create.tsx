import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/superadmin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdatePaymentGatewayForm from "@components/paymentgateway/payment-gateway-form";
import { adminOnly, getAuthCredentials } from "@utils/auth-utils";

export default function CreatePaymentGatewayPage() {
  const { t } = useTranslation();

  const { adminId } = getAuthCredentials();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-payment-gateway")}
        </h1>
      </div>
      <CreateOrUpdatePaymentGatewayForm />
    </>
  );
}
CreatePaymentGatewayPage.authenticate = {
  permissions: adminOnly,
};
CreatePaymentGatewayPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
