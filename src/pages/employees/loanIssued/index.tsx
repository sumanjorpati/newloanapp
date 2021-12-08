import Card from "@components/common/card";
import Layout from "@components/layouts/employee";
import Search from "@components/common/search";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {  staffOnly, getAuthCredentials } from "@utils/auth-utils";
import { SortOrder } from "@ts-types/generated";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";
import LoanIssuedList from "@components/loanissued/loan-issued-list";
import { useLoanIssuesQuery } from "@data/loan-issue/use-loan-issueds.query";

export default function LoanIssueds() {
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
  } = useLoanIssuesQuery({
    limit: 10,
    orderBy,
    sortedBy,
    text: searchTerm,
    page,
    companyId
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
            {t("common:sidebar-nav-item-loan-issue")}
          </h1>
        </div>

        <div className="w-full xl:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          <LinkButton
            href={`${EMPLOYEE_ROUTES.LOAN_ISSUE}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span className="block md:hidden xl:block">
              + {t("form:button-label-add-loan-issue")}
            </span>
            <span className="hidden md:block xl:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>
      </Card>
      <LoanIssuedList
        loanIssueds={data?.loanIssueds}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
LoanIssueds.authenticate = {
  permissions: staffOnly,
};
LoanIssueds.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
