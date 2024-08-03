import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/search/name=""/1`);
  });
};

export default IndexPage;
