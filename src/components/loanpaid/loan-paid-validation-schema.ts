import * as yup from "yup";
export const loanPaidValidationSchema = yup.object().shape({
  firstName: yup.string().required("form:error-name-required"),
 
});
