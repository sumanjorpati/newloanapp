import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteShiftMutation } from "@data/shift/use-shift-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const ShiftDeleteView = () => {
  const { mutate: deleteShiftById, isLoading: loading } = useDeleteShiftMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteShiftById(modalData as string);
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

export default ShiftDeleteView;
