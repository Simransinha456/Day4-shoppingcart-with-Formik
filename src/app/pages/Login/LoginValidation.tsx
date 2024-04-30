import * as Yup from 'yup';

export const LoginValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(20, 'Name is too long')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(5, 'Password is too short')
    .max(10, 'Password is too long')
    .required('Password is required'),
});
