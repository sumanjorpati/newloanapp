import Layout from "@components/layouts/employee";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateCashInForm from "@components/cashin/cash-in-form";
import { staffOnly } from "@utils/auth-utils";
import { useCashInQuery } from "@data/cash-in/use-cash-in.query";

export default function UpdateCashInPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useCashInQuery(query.cashInId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-cash-in")}
        </h1>
      </div>

      <CreateOrUpdateCashInForm initialValues={data?.cashIns} />
    </>
  );
}
UpdateCashInPage.authenticate = {
  permissions: staffOnly,
};
UpdateCashInPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
