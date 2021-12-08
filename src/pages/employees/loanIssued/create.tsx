import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/employee";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateLoanIssuedForm from "@components/loanissued/loan-issued-form";
import { staffOnly } from "@utils/auth-utils";

export default function CreateLoanIssuedPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-loan-issued")}
        </h1>
      </div>
      <CreateOrUpdateLoanIssuedForm />
    </>
  );
}
CreateLoanIssuedPage.authenticate = {
  permissions: staffOnly,
};
CreateLoanIssuedPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
