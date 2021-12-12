
import { useTranslations } from 'next-intl';
import Navigation from '../components/Navigation';

export default function About() {
  const t = useTranslations();

  return (
    <main>
      <Navigation />
    </ main>
  );
}
