import {NextIntlProvider} from 'next-intl';
import '../styles/globals.scss'
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from "@web3-react/core";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </NextIntlProvider>);
}

export default MyApp
