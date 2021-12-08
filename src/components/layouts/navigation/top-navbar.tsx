import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import AuthorizedMenu from "./authorized-menu";
import LinkButton from "@components/ui/link-button";
import { NavbarIcon } from "@components/icons/navbar-icon";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { TENANT_ROUTES,SUPERADMIN_ROUTES } from "@utils/loanoutes";
import {
  adminAndOwnerOnly,
  getAuthCredentials,
  hasAccess,
  staffOnly,
  tenantOnly,
  adminOnly,
  getClockedInStatus,
  setClockedInStatus,
} from "@utils/auth-utils";
import { EMPLOYEE_ROUTES } from "@utils/loanoutes";
import DateTime from "@components/ui/datetime";
import { useClockInMutation } from "@data/user/use-clockin.mutation";
import Button from "@components/ui/button";
import { ClockInOutInput } from "@ts-types/generated";
import { useState } from "react";



const Navbar = () => {
  const { t } = useTranslation();
  const { toggleSidebar } = useUI();
  const { mutate: clockin, isLoading: loading } = useClockInMutation();
  const { permissions } = getAuthCredentials();

  const {isClockIn} = getClockedInStatus();

  let {userId,employeeId,companyId,shiftId} = getAuthCredentials();
  console.log('isClockIn',isClockIn,'userId',userId)

  function onClockInOut() {
    console.log('insideCold')
    if(!isClockIn){
      clockin(
      {
        variables: {
          user:userId,
          employee:employeeId,
          company:companyId,
          shift:shiftId
        },
      },
      {
        onSuccess: ({ data }) => {
          console.log(data);
          if (data?.message == "success") {
              setClockedInStatus(true);
              return;
          } else {
            
          }
        },
        onError: () => {},
      }
    );
  }
  }
  return (
    <header className="bg-white shadow fixed w-full z-40">
      <nav className="px-5 md:px-8 py-4 flex items-center justify-between">
        {/* <!-- Mobile menu button --> */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent lg:hidden"
        >
          <NavbarIcon />
        </motion.button>

        <div className="hidden md:flex ms-5 me-auto">
          <Logo />
        </div>
        <div className=" md:flex ms-5 me-auto">
          <DateTime></DateTime>
        </div>
        {hasAccess(adminOnly, permissions) && (
            <LinkButton
              href={SUPERADMIN_ROUTES.CREATE_COMPANY}
              className="ms-4 md:ms-6"
              size="small"
            >
              {t("common:text-create-company")}
            </LinkButton>
          )}
        <div className="flex items-center space-s-8">
          {hasAccess(tenantOnly,permissions) && (
            <LinkButton
              href={TENANT_ROUTES.CREATE_EMPLOYEE}
              className="ms-4 md:ms-6"
              size="small"
            >
              {t("common:text-create-employee")}
            </LinkButton>
          )}
        {isClockIn !==undefined && !isClockIn && hasAccess(staffOnly, permissions)  && (
            <Button
              onClick={()=>{}}
              className="ms-4 md:ms-6"
              size="small"
            >
              {t("common:text-clock-out")}
            </Button>
          )}
        {isClockIn ===undefined && hasAccess(staffOnly, permissions) && (
            <Button
              onClick={()=>{onClockInOut()}}
              className="ms-4 md:ms-6"
              size="small"
            >
              {t("common:text-clock-in")}
            </Button>
          )}
          <AuthorizedMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
