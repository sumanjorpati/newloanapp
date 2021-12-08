import { CreateCompanyInput, UpdateCompanyInput } from "@ts-types/generated";
import Base from "./base";

class Company extends Base<CreateCompanyInput, UpdateCompanyInput> {}

export default new Company();
