import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteCompanyMutation } from "@data/company/use-company-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const CompanyDeleteView = () => {
  const { mutate: deleteCompanyById, isLoading: loading } = useDeleteCompanyMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteCompanyById(modalData as string);
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

export default CompanyDeleteView;
