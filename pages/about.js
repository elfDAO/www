import { useTranslations } from 'next-intl';
import Navigation from '../components/Navigation';

export default function About() {
  const t = useTranslations('about');

  return (
    <main>
      <Navigation />
      <h1 className="masthead">
        {t.rich('title', { br: () => <br />})}
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