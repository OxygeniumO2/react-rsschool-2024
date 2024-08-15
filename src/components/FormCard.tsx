type FormDataProps = {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordMatch: string;
  gender: string;
  terms: boolean;
  pic: string;
  country: string;
};

export const FormCard = (props: FormDataProps) => {
  console.log(props);
  return <div>{props.age}</div>;
};
