import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const t = useTranslations();

  return (
    <nav>
      <Image alt="tree" width="40" height="40" src="/tree.png" />
      <a target="_blank" rel="noreferrer" className="outlined discord" href="https://join.elfdao.com">
        {t('home.join')} <Image alt="discord logo" src="/discord.svg" width="25" height="25" />
      </a>
    </nav>
  )
}
