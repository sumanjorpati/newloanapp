import { CreateCustomerInput, UpdateCustomerInput } from "@ts-types/generated";
import Base from "./base";

class Customer extends Base<CreateCustomerInput, UpdateCustomerInput> {}

export default new Customer();
