import * as yup from "yup";
export const employeeValidationSchema = yup.object().shape({
 
  firstName: yup.string().required("form:error-first-name-required"),
});
