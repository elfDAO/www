import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import theme from '../styles/theme';
import {NextIntlProvider} from 'next-intl';
import '../styles/globals.scss'
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from "@web3-react/core";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }) {
  const emotionCache = clientSideEmotionCache;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>elfDAO</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <NextIntlProvider messages={pageProps.messages}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <CssBaseline />
            <Component {...pageProps} />
          </Web3ReactProvider>
        </NextIntlProvider>
      </ThemeProvider>
    </CacheProvider>);
}

export default MyApp
