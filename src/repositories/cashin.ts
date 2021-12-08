import { CreateCashInInput, UpdateCashInInput } from "@ts-types/generated";
import Base from "./base";

class CashIn extends Base<CreateCashInInput, UpdateCashInInput> {}

export default new CashIn();
