import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/employee";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateLoanPaidForm from "@components/loanpaid/loan-paid-form";
import { staffOnly } from "@utils/auth-utils";

export default function CreateLoanPaidPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-loan-paid")}
        </h1>
      </div>
      <CreateOrUpdateLoanPaidForm />
    </>
  );
}
CreateLoanPaidPage.authenticate = {
  permissions: staffOnly,
};
CreateLoanPaidPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
