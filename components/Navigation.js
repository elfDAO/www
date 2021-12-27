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
      <div className="nav-inner">
        <div className="nav-links">
          <Link href="/" passHref>
            <div style={{
              width: '45px',
              height: '45px',
              }}>
              <Image alt="tree" height={45} width={45} className={{
                width: '45px',
                height: '45px',
                }} src="/tree.png" />
            </div>
          </Link>
          <Link href="/about" passHref>
            <a className="nav">
            {t('about')}
            </a>
          </Link>
          <a className="nav" href="https://docs.elfdao.com/" target="_blank" rel="noreferrer">
            {t('docs')}
          </a>
        </div>
        <div className="nav-actions">
          <Connect />
          <CustomButton
            disableElevation
            href="https://join.elfdao.com/" target="_blank" rel="noreferrer" variant="contained"
            endIcon={<Image alt="discord logo" src="/discord.svg" width="25" height="25"/>}
          >
            {t('join')}
          </CustomButton>
        </div>
      </div>
    </nav>
  )
}

const CustomButton = muiStyled(Button)(({ theme }) => ({
  color: '#36ECAC',
  backgroundColor: 'rgba(25, 171, 166, 0.2)',
  borderRadius: '20px',
  height: '45px',
  minWidth: '100px',
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
