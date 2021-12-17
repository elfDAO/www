import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('navigation');

  return (
    <nav>
      <Link href="/" passHref><Image alt="tree" width="40" height="40" src="/tree.png" /></Link>
      <Link href="/about" passHref>
        <a className="nav">
        {t('about')}
        </a>
      </Link>
      <a target="_blank" rel="noreferrer" className="outlined discord" href="https://discord.gg/elfdao">
        {t('join')} <Image alt="discord logo" src="/discord.svg" width="25" height="25" />
      </a>
    </nav>
  )
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
