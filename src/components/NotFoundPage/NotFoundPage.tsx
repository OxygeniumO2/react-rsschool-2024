import Link from 'next/link';

export const NotFoundPage = () => {
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <Link href={'/search/name=""/1'}>To main</Link>
    </div>
  );
};
