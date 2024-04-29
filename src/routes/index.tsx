import { ReactNode } from 'react';
import Dashboard from '@/pages/dashboard/Dashboard.tsx';
import ErrorPage from '@/pages/error/ErrorPage.tsx';
import StockDetails from '@/pages/stock/StockDetails';

export interface IPublicRoute {
  path: string;
  element: ReactNode;
}
export const publicRoutes: IPublicRoute[] = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/stock/:id',
    element: <StockDetails />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
];
