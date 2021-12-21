import Link from 'next/link';
import Image from 'next/image';
import { Icon, Stack } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        paddingBottom={'1rem'}
      >
        <>
          <a
            href="https://twitter.com/elf_DAO"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon color="secondary" />
          </a>
        </>
        <>
        <a
          href="https://join.elfdao.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image alt="discord logo" src="/discord.svg" width="25" height="25"/>
        </a>
        </>
      </Stack>
    </>
  )
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
