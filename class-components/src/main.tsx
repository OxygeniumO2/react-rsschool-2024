import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import ErrorComponent from './components/ErrorBoundary/ErrorComponent/ErrorComponent.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorComponent />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
