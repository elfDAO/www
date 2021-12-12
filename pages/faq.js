
import { useTranslations } from 'next-intl';
import Navigation from '../components/Navigation';

export default function FAQ() {
  const t = useTranslations('faq');

  return (
    <main>
      <Navigation />
      <h1 className="masthead">
        {t.rich('title')}
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
