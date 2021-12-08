import Layout from "@components/layouts/tenant";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateEmployeeForm from "@components/employee/employee-form";
import { tenantOnly } from "@utils/auth-utils";
import { useEmployeeQuery } from "@data/employee/use-employee.query";

export default function UpdateEmployeePage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useEmployeeQuery(query.employeeId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-employee")}
        </h1>
      </div>

      <CreateOrUpdateEmployeeForm initialValues={data?.employee} />
    </>
  );
}
UpdateEmployeePage.authenticate = {
  permissions: tenantOnly,
};
UpdateEmployeePage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
