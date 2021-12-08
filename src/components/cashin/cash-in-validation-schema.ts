import * as yup from "yup";
export const cashInValidationSchema = yup.object().shape({
  firstName: yup.string().required("form:error-name-required"),
 
});
