import { lazy, Suspense } from 'react';

const Explore = lazy(() => import('@components/explore/Stocks.tsx'));
const HomePage = () => {
  return (
    <Suspense fallback="Loading...">
      <Explore />
    </Suspense>
  );
};

export default HomePage;
