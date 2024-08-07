import '../index.css';
import '../App.css';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import { ThemeProvider } from '../components/Layout/Layout';

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
