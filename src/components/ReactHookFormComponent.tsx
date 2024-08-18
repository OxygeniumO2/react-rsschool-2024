import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validationSchema } from '../utils/yupData';
import { countriesData } from '../constants/countries';
import { useDispatch } from 'react-redux';
import { setReactHookFormData } from '../store/formsSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import checkPasswordStrength from '../utils/passwordStrength';

interface FormData {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  passwordMatch?: string;
  gender?: string;
  terms?: boolean;
  pic?: File;
  country?: string;
}

export const ReactHookFormComponent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);

  const password = watch('password');

  useEffect(() => {
    if (password) {
      setPasswordStrength(checkPasswordStrength(password));
    } else {
      setPasswordStrength(null);
    }
  }, [password]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const base64String = fileReader.result as string;
      const newFormData = {
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        passwordMatch: data.passwordMatch,
        gender: data.gender,
        terms: data.terms,
        country: data.country,
        pic: base64String,
      };
      dispatch(setReactHookFormData(newFormData));
      navigate('/');
    };

    if (data.pic) {
      fileReader.readAsDataURL(data.pic);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" {...register('name')} />
        <div className="error">{errors.name?.message}</div>
      </div>

      <div>
        <label htmlFor="age">Age: </label>
        <input type="number" id="age" {...register('age')} />
        <div className="error">{errors.age?.message}</div>
      </div>

      <div>
        <label htmlFor="email">E-mail: </label>
        <input type="email" id="email" {...register('email')} />
        <div className="error">{errors.email?.message}</div>
      </div>

      <div style={{ marginBottom: '62px' }}>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          autoComplete="off"
        />
        <div style={{ top: '53px' }} className="error">
          {errors.password?.message}
        </div>

        {passwordStrength && (
          <div className={`passwordStrength ${passwordStrength.toLowerCase()}`}>
            Password is <span>{passwordStrength}</span>
          </div>
        )}

        {!passwordStrength && errors.password?.message && (
          <div className="passwordStrength weak">
            Password is <span>Weak</span>
          </div>
        )}
      </div>
      <div>
        <label htmlFor="passwordMatch">Repeat password: </label>
        <input
          type="password"
          id="passwordMatch"
          {...register('passwordMatch')}
          autoComplete="off"
        />
        <div className="error">{errors.passwordMatch?.message}</div>
      </div>

      <div>
        <label htmlFor="gender">Gender: </label>
        <select id="gender" {...register('gender')}>
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div className="error">{errors.gender?.message}</div>
      </div>

      <div>
        <label htmlFor="terms">Terms and Conditions agreement:</label>
        <input type="checkbox" id="terms" {...register('terms')} />
        <div className="error">{errors.terms?.message}</div>
      </div>

      <div>
        <label htmlFor="pic">Picture: </label>
        <input
          type="file"
          id="pic"
          accept=".jpg, .jpeg, .png"
          {...(register('pic'),
          {
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue('pic', file);
                trigger('pic');
              }
            },
          })}
        />
        <div className="error">{errors.pic?.message}</div>
      </div>

      <div>
        <label htmlFor="country">Country: </label>
        <input
          type="text"
          list="countriesData"
          id="country"
          {...register('country')}
          size={10}
          autoComplete="off"
        />
        <datalist id="countriesData">
          {countriesData.map((country) => (
            <option
              onClick={() => {
                setValue('country', country);
                trigger('country');
              }}
              key={country}
            >
              {country}
            </option>
          ))}
        </datalist>
        {errors.country?.message && (
          <div className="error">
            Country is required and must be from the list
          </div>
        )}
      </div>

      <button type="submit" disabled={Boolean(Object.keys(errors).length)}>
        Submit
      </button>
    </form>
  );
};
