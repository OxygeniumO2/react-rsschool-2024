import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { AppModify } from '../src/App';
import '../src/App.css';
import '../src/index.css';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import { ErrorComponent } from '../src/components/ErrorBoundary/ErrorComponent/ErrorComponent';

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="/naruto.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <ErrorBoundary fallback={<ErrorComponent />}>
              <AppModify>
                <Outlet />
              </AppModify>
            </ErrorBoundary>
            <ScrollRestoration />
            <Scripts />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
