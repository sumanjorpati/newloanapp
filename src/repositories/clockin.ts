import { CreateClockInInput, UpdateClockInInput } from "@ts-types/generated";
import Base from "./base";

class ClockIn extends Base<CreateClockInInput, UpdateClockInInput> {}

export default new ClockIn();
