import Layout from "@components/layouts/superadmin";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateCompanyForm from "@components/company/company-form";
import { adminOnly } from "@utils/auth-utils";
import { useCompanyQuery } from "@data/company/use-company.query";

export default function UpdateCompanyPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useCompanyQuery(query.companyId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-tags")}
        </h1>
      </div>

      <CreateOrUpdateCompanyForm initialValues={data?.company} />
    </>
  );
}
UpdateCompanyPage.authenticate = {
  permissions: adminOnly,
};
UpdateCompanyPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
