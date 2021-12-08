import { useMutation } from "react-query";
import User from "@repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AUTH_CRED } from "@utils/constants";
import { ROUTES } from "@utils/routes";
import { getAuthCredentials } from "@utils/auth-utils";

export const useLogoutMutation = () => {
  const router = useRouter();
  const {userId} = getAuthCredentials()

  return useMutation((userId) => User.logout(API_ENDPOINTS.LOGOUT,{id:''+userId}), {
    onSuccess: () => {
      Cookies.remove(AUTH_CRED);
      router.replace(ROUTES.LOGIN);
    },
  });
};
