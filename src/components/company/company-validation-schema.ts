import * as yup from "yup";
export const companyValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
 
});
