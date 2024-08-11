import { Link } from '@remix-run/react';

export const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ marginBottom: '30px' }}>404 Page Not Found</h2>
      <Link to="/">To main</Link>
    </div>
  );
};
