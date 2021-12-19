import { useEffect, useState } from "react";
import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import ProgressBar from "./subcomponents/ProgressBar";
import MoneyRaised from "./subcomponents/MoneyRaised";
import Image from 'next/image';

const DOLLAR_GOAL = 1000000; // constant value of $M
const GIFT_VALUE = 25; // assuming $25 gift value

export default function Progress() {
  const t = useTranslations();
  const [progress, setProgress] = useState(0)
  const [gifts, setGifts] = useState(0)
  const fetcher = (url) => fetch(url).then((res) => res.json());

  let eth, ethUsdConversion;
  let dollars = 0;
  const { data, error } = useSWR('/api/raised', { fetcher, refreshInterval: 120000 }); // refresh every 2 minutes
  if (!error && data) {
    ({ eth, dollars, ethUsdConversion } = data);
  }

  useEffect(() => {
    setProgress(dollars/DOLLAR_GOAL);
    setGifts(dollars/GIFT_VALUE);
  },[dollars]);

return (
  <>
    <div className="progress">
        <p>{progress.toFixed(0)} gifts funded</p>
      <Image alt="gift" src="/gift.png" width="100" height="100" />
    </div>
    <ProgressBar percent={progress}/>
    <MoneyRaised eth={eth} dollarGoal={DOLLAR_GOAL} dollars={dollars} conversionRate={ethUsdConversion} />
    <a target="_blank" rel="noreferrer" className="outlined contribute" href="https://juicebox.money/#/p/santa">
      {t('home.contribute')}
    </a>
  </>
)
}
