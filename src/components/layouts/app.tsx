import { STAFF, STORE_OWNER, SUPER_ADMIN } from "@utils/constants";
import dynamic from "next/dynamic";
import SuperAdminLayout from "./superadmin";

const AdminLayout = dynamic(() => import("@components/layouts/admin"));
const EmployeeLayout = dynamic(() => import("@components/layouts/employee"));

export default function AppLayout({
  userPermissions,
  ...props
}: {
  userPermissions: string[];
}) {
  if (userPermissions?.includes(SUPER_ADMIN)) {
    return <SuperAdminLayout {...props} />;
  }
  else if(userPermissions?.includes(STORE_OWNER)){
    return <AdminLayout {...props} />;
  }
  else if(userPermissions?.includes(STAFF)){
  return <EmployeeLayout {...props} />;
  }
}
