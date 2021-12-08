import { CreateEmployeeInput, UpdateEmployeeInput } from "@ts-types/generated";
import Base from "./base";

class Employee extends Base<CreateEmployeeInput, UpdateEmployeeInput> {}

export default new Employee();
