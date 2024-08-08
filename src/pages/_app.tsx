import '../index.css';
import '../App.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import { ThemeProvider } from '../components/Layout/Layout';
import { AppProps } from 'next/app';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
