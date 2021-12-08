import Layout from "@components/layouts/superadmin";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateAdminForm from "@components/admin/admin-form";
import { adminOnly } from "@utils/auth-utils";
import { useAdminQuery } from "@data/admin/use-admin.query";

export default function UpdateAdminPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useAdminQuery(query.adminId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-admin")}
        </h1>
      </div>

      <CreateOrUpdateAdminForm initialValues={data?.admin} />
    </>
  );
}
UpdateAdminPage.authenticate = {
  permissions: adminOnly,
};
UpdateAdminPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
