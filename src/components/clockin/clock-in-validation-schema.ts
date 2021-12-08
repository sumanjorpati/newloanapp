import * as yup from "yup";
export const clockInValidationSchema = yup.object().shape({
  firstName: yup.string().required("form:error-name-required"),
 
});
