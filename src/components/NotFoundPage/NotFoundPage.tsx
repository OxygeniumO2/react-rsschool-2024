import Link from 'next/link';

export const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ marginBottom: '20px' }}>404 Page Not Found</h2>
      <Link href={'/search/name=""/1'}>To main</Link>
    </div>
  );
};
