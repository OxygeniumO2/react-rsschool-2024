import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { App } from './App.tsx';
import { ErrorComponent } from './components/ErrorBoundary/ErrorComponent/ErrorComponent.tsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';
import { DetailedCard } from './components/CardList/DetailedCard/DetailedCard.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/search/:name/1" replace />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/search/:name/:page',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: ':cardIndex',
        element: (
          <DetailedCard cardId={''} handleCloseDetailedCard={() => {}} />
        ),
      },
    ],
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
