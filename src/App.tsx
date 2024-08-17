import { Link } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { FormCard } from './components/FormCard';

export default function App() {
  const data = useSelector((state: RootState) => state.formData);
  return (
    <div className="container">
      <div className="mainColumnContainer">
        <div className="linkContainer">
          <Link className="mainPageLink" to="/uncontrolled-form">
            To Uncontrolled Form
          </Link>
        </div>
        {data.uncontrolledFormData.map((item, index) => (
          <FormCard key={item.name} index={index} formData={item} />
        ))}
      </div>
      <div className="mainColumnContainer">
        <div className="linkContainer">
          <Link className="mainPageLink" to="/react-hook-form">
            To React-hook-form
          </Link>
        </div>
        {data.reactHookFormData.map((item, index) => (
          <FormCard key={item.name} index={index} formData={item} />
        ))}
      </div>
    </div>
  );
}
