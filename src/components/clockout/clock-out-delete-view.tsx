import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteClockOutMutation } from "@data/clock-out/use-clock-out-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const ClockOutDeleteView = () => {
  const { mutate: deleteClockOutById, isLoading: loading } = useDeleteClockOutMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteClockOutById(modalData as string);
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

export default ClockOutDeleteView;
