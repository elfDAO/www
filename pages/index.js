import Meta from "../components/Meta";
import { useTranslations } from 'next-intl';
import Navigation from "../components/Navigation";
import Progress from "../components/Progress";
import styled from 'styled-components';
import Footer from "@components/footer";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import MintNFTs from "../components/mintNfts";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <main>
        <Meta />
        <Navigation />
        <header>
          <h1 className="masthead">
            {t.rich('home.tagline', { br: () => <br />})}
          </h1>
          <h2 style={{paddingBottom: '1.5rem', color: '#36ECAC', textAlign:"center"}}>{t('home.tldr')}</h2>
          <Progress />
        </header>
        <article>
          <p className="manifesto center" style={{marginBottom: '2rem'}}>
            {t.rich('home.manifesto', {
              strong: (children) => <strong>{children} </strong>,
            })}
          </p>
          <p className="manifesto center">
            {t.rich('home.why', {
              strong: (children) => <strong>{children} </strong>,
            })}
          </p>
        </article>
        <Spacer />
        <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
            <Box sx={{
              width: { xs: 250, sm: 800 },
              borderRadius: '5px',
              backgroundColor: 'primary.dark',
              textAlign: 'center',
              padding: '10px',
            }}
            >
            <h3 className="manifesto">
              Contributed on Juicebox already? NFTs will be available for claiming soon.
              <br />
              Join our Discord and follow our Twitter for daily updates.
            </h3>
          </Box>
          <MintNFTs />
        </Stack>
      </main>
      <Footer />
    </>
  );
}

const Spacer = styled.div`
  height: 2rem;
`;

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}

