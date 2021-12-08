import Layout from "@components/layouts/employee";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateLoanIssuedForm from "@components/loanissued/loan-issued-form";
import { staffOnly } from "@utils/auth-utils";
import { useLoanIssueQuery } from "@data/loan-issue/use-loan-issue.query";

export default function UpdateLoanIssuedPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useLoanIssueQuery(query.loanId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-loan-issued")}
        </h1>
      </div>

      <CreateOrUpdateLoanIssuedForm initialValues={data?.loanIssued} />
    </>
  );
}
UpdateLoanIssuedPage.authenticate = {
  permissions: staffOnly,
};
UpdateLoanIssuedPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
