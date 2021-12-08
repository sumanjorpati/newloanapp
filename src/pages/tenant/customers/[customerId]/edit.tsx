import Layout from "@components/layouts/tenant";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import EmployeeLayout from "@components/layouts/employee";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateCustomerForm from "@components/customer/customer-form";
import { getAuthCredentials, staffAndTenant } from "@utils/auth-utils";
import { useCustomerQuery } from "@data/customer/use-customer.query";

export default function UpdateCustomerPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useCustomerQuery(query.customerId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-customer")}
        </h1>
      </div>

      <CreateOrUpdateCustomerForm initialValues={data?.customer} />
    </>
  );
}
UpdateCustomerPage.authenticate = {
  permissions: staffAndTenant,
};
const {employeeId} = getAuthCredentials()

console.log('employeeId edit',employeeId)
UpdateCustomerPage.Layout = (employeeId=='0')? Layout : EmployeeLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
