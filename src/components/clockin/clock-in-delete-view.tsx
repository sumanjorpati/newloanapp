import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteClockInMutation } from "@data/clock-in/use-clock-in-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const ClockInDeleteView = () => {
  const { mutate: deleteClockInById, isLoading: loading } = useDeleteClockInMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteClockInById(modalData as string);
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

export default ClockInDeleteView;
