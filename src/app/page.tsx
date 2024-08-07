'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DefaultPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/search/name=""/1');
  });
  return null;
};

export default DefaultPage;
