import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { styled as muiStyled } from '@mui/material/styles';
import Connect from './connect';
import { Button, Stack } from '@mui/material';

export default function Navigation() {
  const t = useTranslations('navigation');

  return (
    <nav>
      <Stack direction="row" justifyContent={'space-between'} width={"100%"} alignItems="center">
        <Link href="/" passHref><Image alt="tree" width="40" height="40" src="/tree.png" /></Link>
        <Link href="/about" passHref>
          <a className="nav">
          {t('about')}
          </a>
        </Link>
        <Link href="/about" passHref>
          <a className="nav">
          {t('docs')}
          </a>
        </Link>
        <Stack direction="row" justifyContent={'flex-end'} spacing={3} alignItems="center">
          <Connect />
          <CustomButton
            disableElevation
            href="https://discord.gg/elfdao" target="_blank" rel="noreferrer" variant="contained"
            endIcon={<Image alt="discord logo" src="/discord.svg" width="25" height="25"/>}
          >
            {t('join')}
          </CustomButton>
        </Stack>
      </Stack>
    </nav>
  )
}

const CustomButton = muiStyled(Button)(({ theme }) => ({
  color: '#36ECAC',
  backgroundColor: '#236357',
  height: '45px',
  fontSize: '1.2rem',
  fontFamily: [
    'Space Mono,monospace',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
}));

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
