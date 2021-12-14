import ProgressBar from "../components/ProgressBar";
import MoneyRaised from "../components/MoneyRaised";
import Meta from "../components/Meta";
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Navigation from "../components/Navigation";

export default function Home() {
  const t = useTranslations();

  // TODO: these values need to be pulled from a server that can interact w/ the blockchain. I've already written the code, just need to get an API key.
  const eth = 0
  const dollarGoal = 1_000_000
  const conversionRate = 4450.67

  const [progress, setProgress] = useState(((eth * conversionRate) / dollarGoal) * 100)
  const [loading, setLoading] = useState(true)

  return (
    <main>
      <Meta />
      <Navigation />
      <br></br><br></br>
      <header>
        <h1 className="masthead">
          {t.rich('home.tagline', { br: () => <br />})}
        </h1>
        <div className="progress">
          <p>{progress.toFixed(0)}%</p>
          <Image alt="gift" src="/gift.png" width="100" height="100" />
        </div>
        <ProgressBar percent={progress}/>
        <MoneyRaised eth={eth} dollarGoal={dollarGoal} conversionRate={conversionRate} />
        {/* TODO: swap it out to contribte when we are ready to launch
        <a disabled target="_blank" rel="noreferrer" className="outlined contribute" href="https://juicebox.money/#/p/elfdao">
          {t('home.contribute')}
        </a> */}
        <div className="outlined contribute">
          {t('home.comingSoon')}
        </div>
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
