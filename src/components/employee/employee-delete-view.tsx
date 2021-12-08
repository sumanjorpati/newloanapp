import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteEmployeeMutation } from "@data/employee/use-employee-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const EmployeeDeleteView = () => {
  const { mutate: deleteEmployeeById, isLoading: loading } = useDeleteEmployeeMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteEmployeeById(modalData as string);
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

export default EmployeeDeleteView;
