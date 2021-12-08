import { CreatePaymentAccountInput, UpdatePaymentAccountInput } from "@ts-types/generated";
import Base from "./base";

class PaymentAccount extends Base<CreatePaymentAccountInput, UpdatePaymentAccountInput> {}

export default new PaymentAccount();
