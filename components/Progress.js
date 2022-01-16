import { useEffect, useState } from "react";
import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import ProgressBar from "./subcomponents/ProgressBar";
import MoneyRaised from "./subcomponents/MoneyRaised";
import Image from 'next/image';

const GIFT_VALUE = 25; // assuming $25 gift value
export const MILESTONES = [50, 100, 200, 500, 750, 1000].map(z => z * 1000)

// final raised: 12.0499662322

export default function Progress() {
  const t = useTranslations();

  const [dollarGoal, setDollarGoal] = useState(0)
  const [progress, setProgress] = useState(0)
  const [gifts, setGifts] = useState(0)

  const fetcher = (url) => fetch(url).then((res) => res.json());

  let ethUsdConversion;
  const { data, error } = useSWR('/api/raised', { fetcher, revalidateOnFocus: false }); // refresh every 2 minutes
  if (!error && data) {
    ({ ethUsdConversion } = data);
  }
  const eth = 12.04996; // final raised value
  const dollars = ethUsdConversion * eth;

  useEffect(() => {
    setProgress(dollars / dollarGoal * 100);
    setGifts(dollars / GIFT_VALUE);
    setDollarGoal(MILESTONES.filter(z => dollars < z)[0])
  }, [dollars, dollarGoal]);

  return (
    <div className="progress-wrapper">
      <div className="progress">
        <p>{gifts.toFixed(0)} gifts funded</p>
        <Image alt="gift" src="/gift.png" width="100" height="100" />
      </div>
      <ProgressBar percent={100} />
      <MoneyRaised eth={eth} dollarGoal={dollarGoal} dollars={dollars} conversionRate={ethUsdConversion} />
      <a target="_blank" rel="noreferrer" className="outlined contribute" href="https://juicebox.money/#/p/elfdao">
        {t('home.contribute')}
      </a>
    </div>
  )
}
