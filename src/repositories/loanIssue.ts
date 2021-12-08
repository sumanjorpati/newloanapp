import { 
    CreateLoanIssuedInput,
     UpdateLoanIssuedInput
     } from "@ts-types/generated";
import Base from "./base";

class LoanIssued extends Base<CreateLoanIssuedInput, UpdateLoanIssuedInput> {}

export default new LoanIssued();

