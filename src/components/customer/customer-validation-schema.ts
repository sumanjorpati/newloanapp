import * as yup from "yup";
export const customerValidationSchema = yup.object().shape({
  firstName: yup.string().required("form:error-name-required"),
 
});
