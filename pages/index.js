import Head from "next/head";
import ProgressBar from "../components/ProgressBar";
import MoneyRaised from "../components/MoneyRaised"
import Meta from "../components/Meta";
import { useEffect, useState } from 'react'

export default function Home() {

  // these values need to be pulled from a server that can interact w/ the blockchain. I've already written the code, just need to get an API key.
  const eth = 21.55
  const dollarGoal = 1_000_000
  const conversionRate = 4450.67

  const [progress, setProgress] = useState(((eth * conversionRate) / dollarGoal) * 100)
  const [loading, setLoading] = useState(true)

  return (
    <main>
      <Meta />
      <nav>
        <img width="40" height="40" src="/tree.png"></img>
        <a target="_blank" rel="noreferrer" className="outlined discord" href="https://join.elfdao.com">Join <img src="/discord.svg" width="25" height="25"></img></a>
      </nav>
      <header>
        <h1 className="masthead">Santa ain't real,<br/> but his elves are.</h1>
        <div className="progress">
          <p>{progress.toFixed(0)}%</p>
          <img src="/gift.png" width="100" height="100"></img>
        </div>
        <ProgressBar percent={progress}/>
        <MoneyRaised eth={eth} dollarGoal={dollarGoal} conversionRate={conversionRate} />
        <a target="_blank" rel="noreferrer" className="outlined contribute" href="https://juicebox.money/#/p/santa">Contribute</a>
      </header>
      <article>
        <p className="manifesto" style={{marginBottom: '2rem'}}>Here at elfDAO, we are elves - the workers, builders, and, contributors of holiday cheer. We elves see the activity of gift-giving as one of the best ways to use our platform to share cheer to children. And <strong>we're sick of seeing "Santa" never show up for children less fortunate.</strong> </p>

        <p className="manifesto">That's why we've created elfDAO - to fund, organize, and donate gifts to institutions, orphanages, and low-income neighborhood centers and <strong>bring holiday joy to as many children as possible.</strong></p>
      </article>
    </main>
  );
}
