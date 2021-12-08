import { useMutation } from "react-query";
import User from "@repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AUTH_CRED, CLOCKED } from "@utils/constants";
import { ROUTES } from "@utils/routes";
import { getAuthCredentials } from "@utils/auth-utils";
import { ClockInOutInput} from "@ts-types/generated";

export const useClockOutMutation = () => {
  const router = useRouter();
  const {userId,companyId,employeeId,shiftId} = getAuthCredentials()
  const ClockOutVariable:ClockInOutInput = {
    userId:userId,
    companyId:companyId,
    employeeId:employeeId,
    shiftId:shiftId
  }
  return useMutation((ClockOutVariable) => User.clockout(API_ENDPOINTS.CLOCKOUT,ClockOutVariable), {
    onSuccess: () => {
      Cookies.remove(CLOCKED);
      router.replace(ROUTES.LOGIN);
    },
  });
};
