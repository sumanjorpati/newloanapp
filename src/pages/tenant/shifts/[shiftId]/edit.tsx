import Layout from "@components/layouts/tenant";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateShiftForm from "@components/shift/shift-form";
import { tenantOnly } from "@utils/auth-utils";
import { useShiftQuery } from "@data/shift/use-shift.query";

export default function UpdateShiftPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useShiftQuery(query.shiftId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-shift")}
        </h1>
      </div>

      <CreateOrUpdateShiftForm initialValues={data?.shift} />
    </>
  );
}
UpdateShiftPage.authenticate = {
  permissions: tenantOnly,
};
UpdateShiftPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
