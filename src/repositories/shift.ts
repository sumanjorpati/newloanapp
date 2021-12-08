import { CreateShiftInput, UpdateShiftInput } from "@ts-types/generated";
import Base from "./base";

class Shift extends Base<CreateShiftInput, UpdateShiftInput> {}

export default new Shift();
