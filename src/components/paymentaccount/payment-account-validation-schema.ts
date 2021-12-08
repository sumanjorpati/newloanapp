import * as yup from "yup";
export const paymentAccountValidationSchema = yup.object().shape({
  shortName: yup.string().required("form:error-name-required"),
 
});
