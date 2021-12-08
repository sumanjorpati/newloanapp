import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteCashInMutation } from "@data/cash-in/use-cash-in-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const CashInDeleteView = () => {
  const { mutate: deleteCashInById, isLoading: loading } = useDeleteCashInMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteCashInById(modalData as string);
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

export default CashInDeleteView;
