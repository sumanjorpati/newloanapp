import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteAdminMutation } from "@data/admin/use-admin-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const AdminDeleteView = () => {
  const { mutate: deleteAdminById, isLoading: loading } = useDeleteAdminMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteAdminById(modalData as string);
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

export default AdminDeleteView;
