import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/employee";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateCashOutForm from "@components/cashout/cash-out-form";
import { staffOnly } from "@utils/auth-utils";

export default function CreateCashOutPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-cash-out")}
        </h1>
      </div>
      <CreateOrUpdateCashOutForm />
    </>
  );
}
CreateCashOutPage.authenticate = {
  permissions: staffOnly,
};
CreateCashOutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
