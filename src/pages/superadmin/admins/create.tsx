import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/superadmin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateAdminForm from "@components/admin/admin-form";
import { adminOnly } from "@utils/auth-utils";

export default function CreateAdminPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-admin")}
        </h1>
      </div>
      <CreateOrUpdateAdminForm />
    </>
  );
}
CreateAdminPage.authenticate = {
  permissions: adminOnly,
};
CreateAdminPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
