import * as yup from "yup";
export const cashOutValidationSchema = yup.object().shape({
  firstName: yup.string().required("form:error-name-required"),
 
});
