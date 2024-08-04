import '../index.css';
import '../App.css';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}
