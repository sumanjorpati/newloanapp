import * as yup from "yup";
export const adminValidationSchema = yup.object().shape({
  firstName: yup.string().required("form:error-name-required"),
 
});
