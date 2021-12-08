import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/employee";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateClockInForm from "@components/clockin/clock-in-form";
import { staffOnly } from "@utils/auth-utils";

export default function CreateClockInPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-clock-in")}
        </h1>
      </div>
      <CreateOrUpdateClockInForm />
    </>
  );
}
CreateClockInPage.authenticate = {
  permissions: staffOnly,
};
CreateClockInPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
