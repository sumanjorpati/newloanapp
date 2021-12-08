import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/employee";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateCashInForm from "@components/cashin/cash-in-form";
import { staffOnly } from "@utils/auth-utils";

export default function CreateCashInPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-cashIn")}
        </h1>
      </div>
      <CreateOrUpdateCashInForm />
    </>
  );
}
CreateCashInPage.authenticate = {
  permissions: staffOnly,
};
CreateCashInPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
