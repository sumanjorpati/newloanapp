import Layout from "@components/layouts/employee";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateCashOutForm from "@components/cashout/cash-out-form";
import { staffOnly } from "@utils/auth-utils";
import { useCashOutQuery } from "@data/cash-out/use-cash-out.query";

export default function UpdateCashOutPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useCashOutQuery(query.cashOutId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-cash-out")}
        </h1>
      </div>

      <CreateOrUpdateCashOutForm initialValues={data?.cashOuts} />
    </>
  );
}
UpdateCashOutPage.authenticate = {
  permissions: staffOnly,
};
UpdateCashOutPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
