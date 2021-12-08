export const LOANOUTESOLD = {
    DASHBOARD: "/",
    LOAN: "/loan/loans",
    CASH_IN_OUT: "/cashinout/cashinouts",
    PAYMENT_GATEWAY: "/superadmin/payment_gateways",
    PAYMENT_ACCOUNT: "/tenant/payment_accounts",
    EMPLOYEE: "/tenant/employees",
    CUSTOMER: "/tenant/customers",
    ADMIN: "/superadmin/admins",
    COMPANY: "/superadmin/companies",
    CREATE_LOAN_ISSUE: "/loan/create_loan_issue",
    EDIT_LOAN_ISSUE: "/loan/edit_loan_issue",
    DELETE_LOAN_ISSUE: "/loan/delete_loan_issue",
    CREATE_LOAN_PAID: "/loan/create_loan_paid",
    EDIT_LOAN_PAID: "/loan/edit_loan_paid",
    DELETE_LOAN_PAID:"/loan/delete_loan_paid",
    CREATE_CASH_IN: "/cashinout/create_cash_in",
    EDIT_CASH_IN: "/cashinout/edit_cash_in",
    DELETE_CASH_IN: "/cashinout/delete_cash_in",
    CREATE_CASH_OUT: "/cashinout/create_cash_out",
    EDIT_CASH_OUT: "/cashinout/edit_cash_out",
    DELETE_CASH_OUT:"/cashinout/delete_cash_out",
    CREATE_COMPANY: "/cashinout/create_company",
    EDIT_COMPANY: "/cashinout/edit_company",
    DELETE_COMPANY: "/cashinout/delete_company",
    CREATE_PAYMENT_GATEWAY: "/cashinout/create_payment_gateway",
    EDIT_PAYMENT_GATEWAY: "/cashinout/edit_payment_gateway",
    DELETE_PAYMENT_GATEWAY: "/cashinout/delete_payment_gateway",
    CREATE_PAYMENT_ACCOUNT: "/cashinout/create_payment_account",
    EDIT_PAYMENT_ACCOUNT: "/cashinout/edit_payment_account",
    DELETE_PAYMENT_ACCOUNT: "/cashinout/delete_payment_account",
    CREATE_CUSTOMER: "/cashinout/create_customer",
    EDIT_CUSTOMER: "/cashinout/edit_customer",
    DELETE_CUSTOMER: "/cashinout/delete_customer",
    CREATE_EMPLOYEE: "/cashinout/create_employee",
    EDIT_EMPLOYEE: "/cashinout/edit_employee",
    DELETE_EMPLOYEE: "/cashinout/delete_employee",
  };
  
  export const SUPERADMIN_ROUTES = {
      SUPERADMINDASHBOARD: "/superadmin/dashboard",
      COMPANY: "/superadmin/companies",
      CREATE_COMPANY: "/superadmin/companies/create",
      ADMIN: "/superadmin/admins",
      PAYMENT_GATEWAY: "/superadmin/payment_gateways",
      REPORTS: "/superadmin/reports",
      PROFIT_LOSS_REPORT: "/superadmin/profit_loss_report"
  } 

  export const TENANT_ROUTES = {
    TENANT_DASHBOARD: "/tenant/dashboard",
    EMPLOYEE: "/tenant/employees",
    CUSTOMER: "/tenant/customers",
    PAYMENT_ACCOUNT: "/tenant/payment_accounts",
    REPORTS: "/tenant/reports",
    SHIFT: "/tenant/shifts",
    CREATE_EMPLOYEE: "/tenant/employees/create",
    PROFIT_LOSS_REPORT: "/tenant/profit_loss_report"
} 

export const EMPLOYEE_ROUTES = {
    EMPLOYEE_DASHBOARD: "/loan/dashboard",
    CUSTOMER: "/tenant/customers",
    LOAN_ISSUE: "/employees/loanIssued",
    LOAN_PAID: "/employees/loanPaid",
    CASH_IN: "/employees/cashIn",
    CASH_OUT: "/employees/cashOut",
    LOAN_REPORT: "/employees/reports",
    CASH_IN_OUT_REPORT: "/employees/reports",
    CLOCK_IN: "/employees/clockIn",
    CLOCK_OUT:"/employees/clockOut"
} 