import Meta from "../components/Meta";
import { useTranslations } from 'next-intl';
import Navigation from "../components/Navigation";
import Progress from "../components/Progress";
import { useState } from "react";

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      <Meta />
      <Navigation />
      <br></br><br></br>
      <header>
        <h1 className="masthead">
          {t.rich('home.tagline', { br: () => <br />})}
        </h1>
        <Progress />
      </header>
      <article>
        <p className="manifesto center" style={{marginBottom: '2rem'}}>
          {t.rich('home.manifesto', {
            strong: (children) => <strong>{children} </strong>,
          })}
        </p>
        <p className="manifesto center">
          {t.rich('home.why', {
            strong: (children) => <strong>{children} </strong>,
          })}
        </p>
      </article>
    </main>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}

