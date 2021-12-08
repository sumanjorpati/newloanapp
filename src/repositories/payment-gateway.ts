import { CreatePaymentGatewayInput, UpdatePaymentGatewayInput } from "@ts-types/generated";
import Base from "./base";

class PaymentGateway extends Base<CreatePaymentGatewayInput, UpdatePaymentGatewayInput> {}

export default new PaymentGateway();
