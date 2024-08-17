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
  serviceError?: string;
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
  email: string().email('Invalid email address').required('Email is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .test(
      '1 lower case',
      'Password must contain at least 1 lower case letter',
      (value) => Boolean(value && /[a-z]/.test(value))
    )
    .test(
      '1 upper case',
      'Password must contain at least 1 upper case letter',
      (value) => Boolean(value && /[A-Z]/.test(value))
    )
    .test('1 letter', 'Password must contain at least 1 number', (value) =>
      Boolean(value && /[0-9]/.test(value))
    )
    .test(
      '1 speacial character',
      'Password must contain at least 1 special character',
      (value) => Boolean(value && /[!@#$%^&*]/.test(value))
    ),
  passwordMatch: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: string().oneOf(['male', 'female'], 'Gender is required'),
  terms: boolean().oneOf([true], 'You must accept the terms and conditions'),
  country: string().required('Country is required').oneOf(countriesData),
  pic: mixed()
    .required('Picture is required')
    .test('fileSize', 'File size is larger than 128kb', (value) => {
      if (value instanceof File) {
        return value.size <= 128 * 1024;
      }
    })
    .test('fileFormat', 'Unsupported file format', (value) => {
      if (value instanceof File) {
        const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        return allowedFormats.includes(value.type);
      }
    }),
});
