import Modal from "@components/ui/modal/modal";
import dynamic from "next/dynamic";
import { useModalAction, useModalState } from "./modal.context";
import CompanyDeleteView from "@components/company/company-delete-view";
import AdminDeleteView from "@components/admin/admin-delete-view";
import PaymentGatewayDeleteView from "@components/paymentgateway/payment-gateway-delete-view";
import ShiftDeleteView from "@components/shift/shift-delete-view";
import CashInDeleteView from "@components/cashin/cash-in-delete-view";
import CashOutDeleteView from "@components/cashout/cash-out-delete-view";
import LoanIssuedDeleteView from "@components/loanissued/loan-issued-delete-view";
import LoanPaidDeleteView from "@components/loanpaid/loan-paid-delete-view";
import CustomerDeleteView from "@components/customer/customer-delete-view";
import EmployeeDeleteView from "@components/employee/employee-delete-view";
import PaymentAccountDeleteView from "@components/paymentaccount/payment-account-delete-view";
const TagDeleteView = dynamic(() => import("@components/tag/tag-delete-view"));
const TaxDeleteView = dynamic(() => import("@components/tax/tax-delete-view"));
const BanCustomerView = dynamic(() => import("@components/user/user-ban-view"));
const UserWalletPointsAddView = dynamic(
  () => import("@components/user/user-wallet-points-add-view")
);
const ShippingDeleteView = dynamic(
  () => import("@components/shipping/shipping-delete-view")
);
const CategoryDeleteView = dynamic(
  () => import("@components/category/category-delete-view")
);
const CouponDeleteView = dynamic(
  () => import("@components/coupon/coupon-delete-view")
);

const ProductDeleteView = dynamic(
  () => import("@components/product/product-delete-view")
);
const TypeDeleteView = dynamic(
  () => import("@components/group/group-delete-view")
);
const AttributeDeleteView = dynamic(
  () => import("@components/attribute/attribute-delete-view")
);

const ApproveShopView = dynamic(
  () => import("@components/shop/approve-shop-view")
);
const DisApproveShopView = dynamic(
  () => import("@components/shop/disapprove-shop-view")
);
const RemoveStaffView = dynamic(
  () => import("@components/shop/staff-delete-view")
);

const ExportImportView = dynamic(
  () => import("@components/product/import-export-modal")
);

const AttributeExportImport = dynamic(
  () => import("@components/attribute/attribute-import-export")
);
const UpdateRefundConfirmationView = dynamic(
  () => import("@components/refund/refund-confirmation-view")
);
const RefundImageModal = dynamic(
  () => import("@components/refund/refund-image-modal")
);

const ManagedModal = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "DELETE_PRODUCT" && <ProductDeleteView />}
      {view === "DELETE_TYPE" && <TypeDeleteView />}
      {view === "DELETE_ATTRIBUTE" && <AttributeDeleteView />}
      {view === "DELETE_CATEGORY" && <CategoryDeleteView />}
      {view === "DELETE_COUPON" && <CouponDeleteView />}
      {view === "DELETE_TAX" && <TaxDeleteView />}
      {view === "DELETE_SHIPPING" && <ShippingDeleteView />}
      {view === "DELETE_TAG" && <TagDeleteView />}
      {view === "DELETE_SHIFT" && <ShiftDeleteView/>}
      {view === "DELETE_COMPANY" && <CompanyDeleteView/>}
      {view === "DELETE_ADMIN" && <AdminDeleteView/>}
      {view === "DELETE_CASH_IN" && <CashInDeleteView/>}
      {view === "DELETE_CASH_OUT" && <CashOutDeleteView/>}
      {view === "DELETE_LOAN_ISSUE" && <LoanIssuedDeleteView/>}
      {view === "DELETE_LOAN_PAID" && <LoanPaidDeleteView/>}
      {view === "DELETE_CUSTOMER" && <CustomerDeleteView/>}
      {view === "DELETE_EMPLOYEE" && <EmployeeDeleteView/>}
      {view === "DELETE_PAYMENT_GATEWAY" && <PaymentGatewayDeleteView/>}
      {view === "DELETE_PAYMENT_ACCOUNT" && <PaymentAccountDeleteView/>}
      {view === "BAN_CUSTOMER" && <BanCustomerView />}
      {view === "SHOP_APPROVE_VIEW" && <ApproveShopView />}
      {view === "SHOP_DISAPPROVE_VIEW" && <DisApproveShopView />}
      {view === "DELETE_STAFF" && <RemoveStaffView />}
      {view === "UPDATE_REFUND" && <UpdateRefundConfirmationView />}
      {view === "ADD_WALLET_POINTS" && <UserWalletPointsAddView />}
      {view === "REFUND_IMAGE_POPOVER" && <RefundImageModal />}
      {view === "EXPORT_IMPORT_PRODUCT" && <ExportImportView />}
      {view === "EXPORT_IMPORT_ATTRIBUTE" && <AttributeExportImport />}
    </Modal>
  );
};

export default ManagedModal;
