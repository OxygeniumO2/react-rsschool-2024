import './card.css';
type FormDataProps = {
  index: number;
  formData: {
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
};

export const FormCard = ({ formData, index }: FormDataProps) => {
  return (
    <div className={`card ${index === 0 ? 'lastCard' : ''}`}>
      <div className="cardImgContainer">
        <img src={formData.pic} alt="img" />
      </div>
      <div className="cardContent">
        {Object.entries(formData).map(([key, value]) =>
          key === 'pic' ? null : (
            <p key={key}>
              <b>{key}:</b> {value === true ? 'true' : value}
            </p>
          )
        )}
      </div>
    </div>
  );
};
