import { boolean, mixed, number, object, ref, string } from 'yup';
import { countriesData } from '../constants/countries';

export interface Errors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  passwordMatch?: string;
  gender?: string;
  terms?: string;
  pic?: string;
  country?: string;
}

export const validationSchema = object({
  name: string()
    .required('Name is required')
    .test('capitalize', 'First letter must be uppercase', (value) =>
      Boolean(value && value[0] === value[0].toUpperCase())
    ),
  age: number()
    .typeError('Age required, and must be a number')
    .positive('Age must be positive'),
  email: string().matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    'Invalid email format'
  ),
  password: string().test('complexity', function (value) {
    const { path, createError } = this;

    if (!value) {
      return createError({
        path,
        message: 'Password is required',
      });
    }

    if (!/[a-z]/.test(value)) {
      return createError({
        path,
        message: 'Password must contain at least 1 lower case letter (a-z)',
      });
    }

    if (!/[A-Z]/.test(value)) {
      return createError({
        path,
        message: 'Password must contain at least 1 upper case letter (A-Z)',
      });
    }

    if (!/[0-9]/.test(value)) {
      return createError({
        path,
        message: 'Password must contain at least 1 number',
      });
    }

    if (!/[!@#$%^&*]/.test(value)) {
      return createError({
        path,
        message: 'Password must contain at least 1 special character',
      });
    }

    if (value.length < 6) {
      return createError({
        path,
        message: 'Password must be at least 6 characters',
      });
    }

    return true;
  }),
  passwordMatch: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: string().oneOf(['male', 'female'], 'Gender is required'),
  terms: boolean().oneOf([true], 'You must accept the terms and conditions'),
  country: string().required('Country is required').oneOf(countriesData),
  pic: mixed<File>()
    .test('required', 'File is required', (value) => {
      if (value instanceof File) {
        return Boolean(value);
      }
    })
    .test('fileFormat', 'Unsupported file format', (value) => {
      if (value instanceof File) {
        const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        return allowedFormats.includes(value.type);
      }
    })
    .test('fileSize', 'File size is larger than 512kb', (value) => {
      if (value instanceof File) {
        return value.size <= 512 * 1024;
      }
    }),
});
