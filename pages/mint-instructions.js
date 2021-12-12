
import { useTranslations } from 'next-intl';
import Navigation from '../components/Navigation';

export default function MintInstructions() {
  const t = useTranslations('mint');

  return (
    <main>
      <Navigation />
      <h1 className="masthead">
        {t.rich('howTo')}
      </h1>
    </ main>
  );
}


export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
