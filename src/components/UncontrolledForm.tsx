import { Link } from 'react-router-dom';
import { FormComponent } from './FormComponent';

export const UncontrolledForm = () => {
  return (
    <div className="container">
      <div>
        <Link className="pageLink" to="/">
          To Main Page
        </Link>
        <FormComponent />
      </div>
    </div>
  );
};
