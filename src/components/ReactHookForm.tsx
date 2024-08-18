import { Link } from 'react-router-dom';
import { ReactHookFormComponent } from './ReactHookFormComponent';

export const ReactHookForm = () => {
  return (
    <div className="container">
      <div>
        <Link className="pageLink" to="/">
          To Main Page
        </Link>
        <div className="pageTitle">React Hook Form</div>
        <ReactHookFormComponent />
      </div>
    </div>
  );
};
