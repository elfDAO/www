import Meta from "../components/Meta";
import { useTranslations } from 'next-intl';
import Navigation from "../components/Navigation";
import styled from 'styled-components';
import Footer from "@components/footer";
import { Stack, Typography } from "@mui/material";
import MintWorkerElves from "../components/mintWorkerElf";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <main>
        <Meta />
        <Navigation />
        <header>
          <Typography variant="h1" textAlign="center" sx={{ color: '#36ECAC' }}>
            Thank you for your contributions to elfDAO!
          </Typography>
          <h2 style={{ paddingBottom: '5rem', color: '#36ECAC', textAlign: "center" }}>
            As a token of our appreciation, here is a worker elf :)
          </h2>
        </header>
        <div className="content">
          <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
            <MintWorkerElves />
          </Stack>
        </div>
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

