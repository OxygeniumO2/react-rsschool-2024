import { FormEvent, useRef, useState } from 'react';

import { ValidationError } from 'yup';
import { countriesData } from '../constants/countries';
import { useDispatch } from 'react-redux';
import { setUncontrolledFormData } from '../store/formsSlice';
import { Errors, validationSchema } from '../utils/yupData';
import { useNavigate } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const base64String = fileReader.result as string;
        const newFormData = { ...formData, pic: base64String };
        dispatch(setUncontrolledFormData(newFormData));
        navigate('/');
      };

      fileReader.readAsDataURL(formData.pic);
    } catch (errors) {
      const validationErrors: Record<string, string> = {};

      if (errors instanceof ValidationError && errors.inner) {
        errors.inner.forEach((error) => {
          validationErrors[error.path ?? ''] = error.message;
        });
      }
      setErrors(validationErrors);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" ref={nameRef} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="age">Age: </label>
        <input type="number" id="age" ref={ageRef} />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>
      <div>
        <label htmlFor="email">E-mail: </label>
        <input type="email" id="email" ref={emailRef} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          autoComplete="password"
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label htmlFor="passwordMatch">Repeat password: </label>
        <input
          type="password"
          id="passwordMatch"
          ref={passwordMatchRef}
          autoComplete="password"
        />
        {errors.passwordMatch && (
          <div className="error">{errors.passwordMatch}</div>
        )}
      </div>
      <div>
        <label htmlFor="gender">Gender: </label>
        <select id="gender" ref={genderRef}>
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>
      <div>
        <label htmlFor="terms">Terms and Conditions agreement:</label>
        <input type="checkbox" id="terms" ref={termsRef} />
        {errors.terms && <div className="error">{errors.terms}</div>}
      </div>
      <div>
        <label htmlFor="pic">Picture: </label>
        <input type="file" id="pic" accept=".jpg, .jpeg, .png" ref={picRef} />
        {errors.pic && <div className="error">{errors.pic}</div>}
      </div>
      <div>
        <label htmlFor="country">Country: </label>
        <input
          type="text"
          list="countriesData"
          id="country"
          name="country"
          ref={countryRef}
          size={10}
          autoComplete="off"
        />
        <datalist id="countriesData">
          {countriesData.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </datalist>
        {errors.country && (
          <div className="error">
            Country is required and must be from the list
          </div>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
