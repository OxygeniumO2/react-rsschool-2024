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

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <AppModify>
              <Outlet />
            </AppModify>
            <ScrollRestoration />
            <Scripts />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
