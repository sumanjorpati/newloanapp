import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeletePaymentAccountMutation } from "@data/payment-account/use-payment-account-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const PaymentAccountDeleteView = () => {
  const { mutate: deletePaymentAccountById, isLoading: loading } = useDeletePaymentAccountMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deletePaymentAccountById(modalData as string);
      closeModal();
    } catch (error) {
      closeModal();
      getErrorMessage(error);
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default PaymentAccountDeleteView;
