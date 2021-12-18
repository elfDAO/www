import Meta from "../components/Meta";
import { useTranslations } from 'next-intl';
import Navigation from "../components/Navigation";
import Progress from "../components/Progress";
import Nft from "../components/NftCard";
import { Grid } from "@material-ui/core";
import styled from 'styled-components';

export default function Home() {
  const t = useTranslations();
  return (
    <main>
      <Meta />
      <Navigation />
      <br></br>
      <header>
        <h1 className="masthead">
          {t.rich('home.tagline', { br: () => <br />})}
        </h1>
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
      <Grid container width="100%" spacing={3} direction="row" justifyContent="center">
        <Grid item>
          <Nft name={t('nft.elf')} value={'Contributions > 0.1 ETH'} image={'/../public/nfts/elf.svg'} />
        </Grid>
        <Grid item>
          <Nft name={t('nft.reindeer')} value={'Contributions > 0.5 ETH'} image={'/../public/nfts/reindeer.svg'} />
        </Grid>
        <Grid item>
          <Nft name={t('nft.santa')} value={'Top 5 Contributers'} image={'/../public/nfts/santa.svg'} />
        </Grid>
      </Grid>
    </main>
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
