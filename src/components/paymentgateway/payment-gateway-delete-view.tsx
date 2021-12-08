import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeletePaymentGatewayMutation } from "@data/payment-gateway/use-payment-gateway-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const PaymentGatewayDeleteView = () => {
  const { mutate: deletePaymentGatewayById, isLoading: loading } = useDeletePaymentGatewayMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deletePaymentGatewayById(modalData as string);
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

export default PaymentGatewayDeleteView;
