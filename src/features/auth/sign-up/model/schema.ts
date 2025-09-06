import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Min 8 characters').required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export type SignUpFormValues = yup.InferType<typeof signUpSchema>;
