import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/tenant";
import EmployeeLayout from "@components/layouts/employee";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateCustomerForm from "@components/customer/customer-form";
import { getAuthCredentials, staffAndTenant } from "@utils/auth-utils";

export default function CreateCustomerPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-customer")}
        </h1>
      </div>
      <CreateOrUpdateCustomerForm />
    </>
  );
}
CreateCustomerPage.authenticate = {
  permissions: staffAndTenant,
};

const {employeeId} = getAuthCredentials()
console.log('employeeId',employeeId)
CreateCustomerPage.Layout = (employeeId=='0')? Layout : EmployeeLayout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
