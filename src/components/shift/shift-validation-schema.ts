import * as yup from "yup";
export const shiftValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
 
});
