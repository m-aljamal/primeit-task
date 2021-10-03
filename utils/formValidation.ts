import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/,
      "Password must contain at least 1 uppercase, 1 lowercase letter and 1 special character."
    ),
});
