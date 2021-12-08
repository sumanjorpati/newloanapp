import Layout from "@components/layouts/employee";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateClockOutForm from "@components/clockout/clock-out-form";
import { staffOnly } from "@utils/auth-utils";
import { useClockOutQuery } from "@data/clock-out/use-clock-out.query";

export default function UpdateClockOutPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useClockOutQuery(query.clockOutId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-clock-out")}
        </h1>
      </div>

      <CreateOrUpdateClockOutForm initialValues={data?.clockOuts} />
    </>
  );
}
UpdateClockOutPage.authenticate = {
  permissions: staffOnly,
};
UpdateClockOutPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
