import { CreateClockOutInput, UpdateClockOutInput } from "@ts-types/generated";
import Base from "./base";

class ClockOut extends Base<CreateClockOutInput, UpdateClockOutInput> {}

export default new ClockOut();
