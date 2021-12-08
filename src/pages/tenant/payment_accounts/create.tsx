import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/tenant";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdatePaymentAccountForm from "@components/paymentaccount/payment-account-form";
import { tenantOnly } from "@utils/auth-utils";

export default function CreatePaymentAccountPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-payment-account")}
        </h1>
      </div>
      <CreateOrUpdatePaymentAccountForm />
    </>
  );
}
CreatePaymentAccountPage.authenticate = {
  permissions: tenantOnly,
};
CreatePaymentAccountPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
