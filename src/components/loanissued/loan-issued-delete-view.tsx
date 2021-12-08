import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteLoanIssueMutation } from "@data/loan-issue/use-loan-issue-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const LoanIssuedDeleteView = () => {
  const { mutate: deleteLoanIssuedById, isLoading: loading } = useDeleteLoanIssueMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteLoanIssuedById(modalData as string);
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

export default LoanIssuedDeleteView;
