import { Link } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setUncontrolledFormData } from './store/formsSlice';
import { FormCard } from './components/FormCard';

export default function App() {
  const data = useSelector((state: RootState) => state.formData);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="uncontrolledFormContainer">
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        {data.uncontrolledFormData.map((item) => (
          <FormCard key={item.name} {...item} />
        ))}
        <button
          onClick={() =>
            dispatch(
              setUncontrolledFormData({
                id: data.uncontrolledFormData.length,
                name: `test${data.uncontrolledFormData.length}`,
              })
            )
          }
        >
          Add
        </button>
      </div>
      <div className="reactHookFormContainer">
        <Link to="/react-hook-form">React-hook-form</Link>
        {data.reactHookFormData.map((item) => (
          <FormCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}
