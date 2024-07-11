import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/not-found', { replace: true });
  }, []);

  return (
    <div>
      <h2>404 Page Not Found</h2>
      <Link to="/">To main</Link>
    </div>
  );
};
