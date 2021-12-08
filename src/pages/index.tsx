import dynamic from "next/dynamic";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from "@utils/auth-utils";
import { STAFF, STORE_OWNER, SUPER_ADMIN } from "@utils/constants";
import { ROUTES } from "@utils/routes";
import AppLayout from "@components/layouts/app";
const AdminDashboard = dynamic(() => import("@components/dashboard/admin"));
const SuperAdminDashboard = dynamic(()=> import("@components/dashboard/superadmin"));
const EmployeeDashboard = dynamic(() => import("@components/dashboard/employee"));

export default function Dashboard({
  userPermissions,
}: {
  userPermissions: string[];
}) {
  if (userPermissions?.includes(SUPER_ADMIN)) {
    return <SuperAdminDashboard />;
  }
  else if(userPermissions?.includes(STORE_OWNER)) {
    return <AdminDashboard />
  }
  else if (userPermissions?.includes(STAFF)){
  return <EmployeeDashboard/>
  }
}

Dashboard.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const { token, permissions } = getAuthCredentials(ctx);
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "common",
          "table",
          "widgets",
        ])),
        userPermissions: permissions,
      },
    };
  }
  return {
    props: {
      userPermissions: permissions,
    },
  };
};
