import { useState } from "react";
import { useTranslations } from 'next-intl';
import ProgressBar from "./subcomponents/ProgressBar";
import MoneyRaised from "./subcomponents/MoneyRaised";
import Image from 'next/image';

export default function Progress() {
  const t = useTranslations();
    // TODO: these values need to be pulled from a server that can interact w/ the blockchain.
    // I've already written the code, just need to get an API key.
    const eth = 21.55
    const dollarGoal = 1_000_000
    const conversionRate = 4450.67

    const [progress, setProgress] = useState(((eth * conversionRate) / dollarGoal) * 100)

  return (
    <>
      <div className="progress">
          {/* <p>{progress.toFixed(0)} gifts funded</p> */}
        <Image alt="gift" src="/gift.png" width="100" height="100" />
      </div>
      <ProgressBar percent={progress}/>
      <MoneyRaised eth={eth} dollarGoal={dollarGoal} conversionRate={conversionRate} />
      <a target="_blank" rel="noreferrer" className="outlined contribute" href="https://juicebox.money/#/p/santa">
        {t('home.contribute')}
      </a>
    </>
  )
}
