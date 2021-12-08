import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/employee";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateClockOutForm from "@components/clockout/clock-out-form";
import { staffOnly } from "@utils/auth-utils";

export default function CreateClockOutPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-clock-out")}
        </h1>
      </div>
      <CreateOrUpdateClockOutForm />
    </>
  );
}
CreateClockOutPage.authenticate = {
  permissions: staffOnly,
};
CreateClockOutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
