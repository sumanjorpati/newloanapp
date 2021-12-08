import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteCashOutMutation } from "@data/cash-out/use-cash-out-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const CashOutDeleteView = () => {
  const { mutate: deleteCashOutById, isLoading: loading } = useDeleteCashOutMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteCashOutById(modalData as string);
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

export default CashOutDeleteView;
