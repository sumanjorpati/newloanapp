import Card from "@components/common/card";
import Layout from "@components/layouts/tenant";
import Search from "@components/common/search";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {  getAuthCredentials, staffAndTenant } from "@utils/auth-utils";
import { SortOrder } from "@ts-types/generated";
import { TENANT_ROUTES } from "@utils/loanoutes";
import EmployeeLayout from "@components/layouts/employee";
import CustomerList from "@components/customer/customer-list";
import { useCustomersQuery } from "@data/customer/use-customers.query";

export default function Customers() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("createdDate");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {companyId} = getAuthCredentials()
  const {
    data,
    isLoading: loading,
    error,
  } = useCustomersQuery({
    limit: 10,
    orderBy,
    sortedBy,
    text: searchTerm,
    page,
    companyId:''+companyId,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:sidebar-nav-item-customer")}
          </h1>
        </div>

        <div className="w-full xl:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          <LinkButton
            href={`${TENANT_ROUTES.CUSTOMER}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span className="block md:hidden xl:block">
              + {t("form:button-label-add-customer")}
            </span>
            <span className="hidden md:block xl:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>
      </Card>
      <CustomerList
        customers={data?.customers}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
Customers.authenticate = {
  permissions: staffAndTenant,
};
const {employeeId} = getAuthCredentials()

console.log('employeeId index',employeeId)
Customers.Layout = (employeeId=='0')? Layout : EmployeeLayout;
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
