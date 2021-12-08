import * as yup from "yup";
export const clockOutValidationSchema = yup.object().shape({
  firstName: yup.string().required("form:error-name-required"),
 
});
