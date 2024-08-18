import { Link } from 'react-router-dom';
import { FormComponent } from './FormComponent';

export const UncontrolledForm = () => {
  return (
    <div className="container">
      <div>
        <Link className="pageLink" to="/">
          To Main Page
        </Link>
        <div className="pageTitle">Uncontrolled Form</div>
        <FormComponent />
      </div>
    </div>
  );
};
