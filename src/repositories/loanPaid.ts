import { CreateLoanPaidInput, UpdateLoanPaidInput } from "@ts-types/generated";
import Base from "./base";

class LoanPaid extends Base<CreateLoanPaidInput, UpdateLoanPaidInput> {}

export default new LoanPaid();