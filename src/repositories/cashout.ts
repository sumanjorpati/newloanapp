import { CreateCashOutInput, UpdateCashOutInput } from "@ts-types/generated";
import Base from "./base";

class CashOut extends Base<CreateCashOutInput, UpdateCashOutInput> {}

export default new CashOut();
