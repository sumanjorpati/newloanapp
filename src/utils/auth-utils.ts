import Cookie from "js-cookie";
import SSRCookie from "cookie";
import {
  AUTH_CRED,
  PERMISSIONS,
  STAFF,
  STORE_OWNER,
  SUPER_ADMIN,
  TOKEN,
  CLOCKED,
} from "./constants";

export const allowedRoles = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminOnly = [SUPER_ADMIN];
export const tenantOnly = [STORE_OWNER];
export const staffOnly = [STAFF];
export const staffAndTenant = [STORE_OWNER,STAFF];

export function setAuthCredentials(token: string, permissions: any,refresh: string,companyId: string,
  adminId: string,
   employeeId:string,
   superadminId: string,
   userId: string,
   shiftId: string) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions, refresh,companyId,adminId,employeeId,superadminId,userId,shiftId}));
}

 export function setClockedInStatus(isClocked: boolean){
   Cookie.set(CLOCKED,JSON.stringify({isClocked}))
 }

 export function getClockedInStatus(context?: any){
   let clockedIn;
  if (context) {
    clockedIn = parseSSRCookie(context)[CLOCKED];
  } else {
    clockedIn = Cookie.get(CLOCKED);
  }
  if (clockedIn) {
    return JSON.parse(clockedIn);
  }
  return { clockedIn: null};
 }

export function getAuthCredentials(context?: any): {
  token: string | null;
  permissions: string[] | null;
  refresh: string | null;
  companyId: string | null;
  adminId: string | null;
  employeeId: string | null;
  superadminId: string | null;
  userId: string | null;
  shiftId: string | null;
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permissions: null,
     refresh: null , companyId: null,
      adminId: null, employeeId:null,
      superadminId: null,userId: null,
      shiftId: null};
}

export function getAdminId(){
  const {adminId} = getAuthCredentials()
  return adminId
}

export function getSuperAdminId(){
  const {superadminId} = getAuthCredentials()
  return superadminId
}

export function getEmployeeId(){
  const {employeeId} = getAuthCredentials()
  return employeeId
}

export function getCompanyId(){
  const {companyId} = getAuthCredentials()
  return companyId
}

export function getUserId(){
  const {userId} = getAuthCredentials()
  return userId
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? "");
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}
export function isAuthenticated(_cookies: any) {
  return (
    !!_cookies[TOKEN] &&
    Array.isArray(_cookies[PERMISSIONS]) &&
    !!_cookies[PERMISSIONS].length
  );
}
