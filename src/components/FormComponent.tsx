import { FormEvent, useRef, useState } from 'react';
import { AutocompleteCustom } from './AutocompleteCustom';

import {
  object,
  string,
  number,
  mixed,
  boolean,
  ref,
  ValidationError,
} from 'yup';
import { countriesData } from '../constants/countries';

const validationSchema = object({
  name: string()
    .required('Name is required')
    .test('capitalize', 'First letter must be uppercase', (value) =>
      Boolean(value && value[0] === value[0].toUpperCase())
    ),
  age: number().required('Age is required').positive('Age must be positive'),
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
  pic: mixed().required('Picture is required'),
});

interface Errors {
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

export const FormComponent = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordMatchRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const picRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [isBlocked, setIsBlocked] = useState(true);

  const handleAutoComplete = (value: string) => {
    if (countryRef.current !== null) {
      countryRef.current.value = value;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      passwordMatch: passwordMatchRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      country: countryRef.current?.value,
      pic: picRef.current!.files![0],
    };

    console.log(formData);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log(formData);
    } catch (errors) {
      const validationErrors: Record<string, string> = {};

      if (errors instanceof ValidationError && errors.inner) {
        errors.inner.forEach((error) => {
          validationErrors[error.path ?? ''] = error.message;
        });
      }
      setIsBlocked(() => true);
      setErrors(validationErrors);
    }
  };
  return (
    <form onSubmit={handleSubmit} onChange={() => setIsBlocked(() => false)}>
      <div>
        <label htmlFor="name">name </label>
        <input type="text" id="name" ref={nameRef} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="age">age</label>
        <input type="number" id="age" ref={ageRef} />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input type="email" id="email" ref={emailRef} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id="password" ref={passwordRef} />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label htmlFor="passwordMatch">passwordMatch</label>
        <input type="password" id="passwordMatch" ref={passwordMatchRef} />
        {errors.passwordMatch && (
          <div className="error">{errors.passwordMatch}</div>
        )}
      </div>
      <div>
        Gender
        <select id="gender" ref={genderRef}>
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>
      <div>
        <label htmlFor="terms">Terms and Conditions agreement</label>
        <input type="checkbox" id="terms" ref={termsRef} />
        {errors.terms && <div className="error">{errors.terms}</div>}
      </div>
      <div>
        <label htmlFor="pic">Picture</label>
        <input type="file" id="pic" ref={picRef} />
        {errors.pic && <div className="error">{errors.pic}</div>}
      </div>

      <AutocompleteCustom handleAutoComplete={handleAutoComplete} />
      <input type="text" ref={countryRef} id="country" hidden />
      {errors.country && (
        <div className="error">
          Country is required and must be from the list
        </div>
      )}
      <button type="submit" disabled={isBlocked}>
        Submit
      </button>
    </form>
  );
};
