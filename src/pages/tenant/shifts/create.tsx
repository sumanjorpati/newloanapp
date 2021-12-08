import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/tenant";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateShiftForm from "@components/shift/shift-form";
import { tenantOnly } from "@utils/auth-utils";

export default function CreateShiftPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-shift")}
        </h1>
      </div>
      <CreateOrUpdateShiftForm />
    </>
  );
}
CreateShiftPage.authenticate = {
  permissions: tenantOnly,
};
CreateShiftPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
