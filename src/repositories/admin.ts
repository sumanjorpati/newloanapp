import { CreateAdminInput, UpdateAdminInput } from "@ts-types/generated";
import Base from "./base";

class Admin extends Base<CreateAdminInput, UpdateAdminInput> {}

export default new Admin();
