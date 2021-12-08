import * as yup from "yup";
export const paymentGatewayValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
 
});
