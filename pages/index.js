import Meta from "../components/Meta";
import { useTranslations } from 'next-intl';
import Navigation from "../components/Navigation";
import Progress from "../components/Progress";
import Nft from "../components/NftCard";
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import Footer from "@components/footer";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

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
              Contributed on Juicebox already? Claim your NFT here.
              <br />
              Claimlists are updated everyday at 8pm EST.
            </h3>
          </Box>
          <Grid container width="100%" spacing={{xs: 0, sm: 2}} direction={{xs: 'column', sm: 'row'}} justifyContent="center">
            <Grid item>
              <Nft
                name={t('nft.elf')}
                value={'Contributions > 0.1 ETH'}
                image={'/elf.svg'}
                claimable={true}
              />
            </Grid>
            <Grid item>
              <Nft
                name={t('nft.reindeer')}
                value={'Contributions > 0.5 ETH'}
                image={'/reindeer.svg'}
                claimable={false}
              />
            </Grid>
            <Grid item>
              <Nft
                name={t('nft.santa')}
                value={'Top 5 Contributers'}
                image={'/santa.svg'}
                claimable={false}
              />
            </Grid>
          </Grid>
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

