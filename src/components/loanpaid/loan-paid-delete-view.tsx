import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteLoanPaidMutation } from "@data/loan-paid/use-loan-paid-delete.mutation";
import { getErrorMessage } from "@utils/form-error";

const LoanPaidDeleteView = () => {
  const { mutate: deleteLoanPaidById, isLoading: loading } = useDeleteLoanPaidMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteLoanPaidById(modalData as string);
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

export default LoanPaidDeleteView;
