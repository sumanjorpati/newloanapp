import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { SUPERADMIN_ROUTES, TENANT_ROUTES, EMPLOYEE_ROUTES } from "@utils/loanoutes";


export const siteSettings = {
  name: "loanApp",
  description: "",
  logo: {
    url: "/logo.svg",
    alt: "loanApp",
    href: "/",
    width: 128,
    height: 40,
  },
  defaultLanguage: "en",
  author: {
    name: "Esoft",
    websiteUrl: "https://elonsoft.co",
    address: "",
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: ROUTES.PROFILE_UPDATE,
      labelTransKey: "authorized-nav-item-profile",
    },
    {
      href: ROUTES.LOGOUT,
      labelTransKey: "authorized-nav-item-logout",
    },
  ],
  currencyCode: "USD",
  sidebarLinks: {
    superadmin: [
      {
        href: SUPERADMIN_ROUTES.SUPERADMINDASHBOARD,
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
      },
      {
        href: SUPERADMIN_ROUTES.COMPANY,
        label: "sidebar-nav-item-company",
        icon: "ShopIcon",
      },
      {
        href: SUPERADMIN_ROUTES.ADMIN,
        label: "sidebar-nav-item-admin",
        icon: "MyShopIcon",
      },
      {
        href: SUPERADMIN_ROUTES.PAYMENT_GATEWAY,
        label: "sidebar-nav-item-payment-gateway",
        icon: "ProductsIcon",
      },
      {
        href: SUPERADMIN_ROUTES.REPORTS,
        label: "sidebar-nav-item-reports",
        icon: "AttributeIcon",
      },
    ],
    tenant: [
      {
        href: TENANT_ROUTES.TENANT_DASHBOARD,
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
      },
      {
        href: TENANT_ROUTES.EMPLOYEE,
        label: "sidebar-nav-item-employee",
        icon: "ShopIcon",
      },
      {
        href: TENANT_ROUTES.CUSTOMER,
        label: "sidebar-nav-item-customer",
        icon: "MyShopIcon",
      },
      {
        href: TENANT_ROUTES.PAYMENT_ACCOUNT,
        label: "sidebar-nav-item-payment-account",
        icon: "ProductsIcon",
      },
      {
        href: TENANT_ROUTES.SHIFT,
        label: "sidebar-nav-item-shift",
        icon: "DashboardIcon",
      },
      {
        href: TENANT_ROUTES.REPORTS,
        label: "sidebar-nav-item-reports",
        icon: "AttributeIcon",
      },
    ],
    employee: [
      {
        href: EMPLOYEE_ROUTES.EMPLOYEE_DASHBOARD,
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
      },
      {
        href: EMPLOYEE_ROUTES.CUSTOMER,
        label: "sidebar-nav-item-customer",
        icon: "ShopIcon",
      },
      {
        href: EMPLOYEE_ROUTES.LOAN_ISSUE,
        label: "sidebar-nav-item-loan-issue",
        icon: "MyShopIcon",
      },
      {
        href: EMPLOYEE_ROUTES.LOAN_PAID,
        label: "sidebar-nav-item-loan-paid",
        icon: "ProductsIcon",
      },
      {
        href: EMPLOYEE_ROUTES.CASH_IN,
        label: "sidebar-nav-item-cash-in",
        icon: "AttributeIcon",
      },
      {
        href: EMPLOYEE_ROUTES.CASH_OUT,
        label: "sidebar-nav-item-cash-out",
        icon: "DashboardIcon",
      },
      {
        href: EMPLOYEE_ROUTES.LOAN_REPORT,
        label: "sidebar-nav-item-loan-report",
        icon: "ShopIcon",
      },
      {
        href: EMPLOYEE_ROUTES.CASH_IN_OUT_REPORT,
        label: "sidebar-nav-item-cash-in-out-report",
        icon: "MyShopIcon",
      }
    ],
    admin: [
      {
        href: EMPLOYEE_ROUTES.CASH_OUT,
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
      },
      {
        href: ROUTES.SHOPS,
        label: "sidebar-nav-item-shops",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.ADMIN_MY_SHOPS,
        label: "sidebar-nav-item-my-shops",
        icon: "MyShopIcon",
      },
      {
        href: ROUTES.PRODUCTS,
        label: "sidebar-nav-item-products",
        icon: "ProductsIcon",
      },
      {
        href: ROUTES.ATTRIBUTES,
        label: "sidebar-nav-item-attributes",
        icon: "AttributeIcon",
      },
      {
        href: ROUTES.GROUPS,
        label: "sidebar-nav-item-groups",
        icon: "TypesIcon",
      },
      {
        href: ROUTES.CATEGORIES,
        label: "sidebar-nav-item-categories",
        icon: "CategoriesIcon",
      },
      {
        href: ROUTES.TAGS,
        label: "sidebar-nav-item-tags",
        icon: "TagIcon",
      },
      {
        href: ROUTES.ORDERS,
        label: "sidebar-nav-item-orders",
        icon: "OrdersIcon",
      },
      {
        href: ROUTES.ORDER_STATUS,
        label: "sidebar-nav-item-order-status",
        icon: "OrdersStatusIcon",
      },
      {
        href: ROUTES.USERS,
        label: "sidebar-nav-item-users",
        icon: "UsersIcon",
      },
      {
        href: ROUTES.COUPONS,
        label: "sidebar-nav-item-coupons",
        icon: "CouponsIcon",
      },
      {
        href: ROUTES.TAXES,
        label: "sidebar-nav-item-taxes",
        icon: "TaxesIcon",
      },
      {
        href: ROUTES.SHIPPINGS,
        label: "sidebar-nav-item-shippings",
        icon: "ShippingsIcon",
      },
      {
        href: ROUTES.WITHDRAWS,
        label: "sidebar-nav-item-withdraws",
        icon: "WithdrawIcon",
      },
      {
        href: ROUTES.REFUNDS,
        label: "sidebar-nav-item-refunds",
        icon: "RefundsIcon",
      },
      {
        href: ROUTES.SETTINGS,
        label: "sidebar-nav-item-settings",
        icon: "SettingsIcon",
      },
    ],
    shop: [
      {
        href: (shop: string) => `${ROUTES.DASHBOARD}${shop}`,
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.ATTRIBUTES}`,
        label: "sidebar-nav-item-attributes",
        icon: "AttributeIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.PRODUCTS}`,
        label: "sidebar-nav-item-products",
        icon: "ProductsIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.ORDERS}`,
        label: "sidebar-nav-item-orders",
        icon: "OrdersIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.REFUNDS}`,
        label: "sidebar-nav-item-refunds",
        icon: "RefundsIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.STAFFS}`,
        label: "sidebar-nav-item-staffs",
        icon: "UsersIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.WITHDRAWS}`,
        label: "sidebar-nav-item-withdraws",
        icon: "AttributeIcon",
        permissions: adminAndOwnerOnly,
      },
    ],
  },
  product: {
    placeholder: "/product-placeholder.svg",
  },
  avatar: {
    placeholder: "/avatar-placeholder.svg",
  },
};
