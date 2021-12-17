
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import Navigation from '../components/Navigation';
import styled from 'styled-components';
import React, { useEffect, useMemo, useState } from 'react';
import { injected, useENSName, abridgeAddress } from '../utils/web3';
import { useWeb3React } from '@web3-react/core';

export default function MintInstructions() {
  const t = useTranslations('mint');
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { library, active, account, activate, deactivate } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
      console.log('activate');
    } catch(err) {
      console.log(err);
    }
  }

  const disconnect = async () => {
    try {
      await deactivate();
    } catch(err) {
      console.log(err);
    }
  }

  const ENSName = useENSName(account, library);

  let elfProof = [];
  let { data, error } = useSWR(active ? `/api/elfProof?address=${account}` : null, { fetcher, refreshInterval: 0 });
  if (!error && data) {
    const { proof } = data;
    elfProof = proof;
  }

  let reindeerProof = [];
  ({ data, error } = useSWR(active ? `/api/reindeerProof?address=${account}` : null, { fetcher, refreshInterval: 0 }));
  if (!error && data) {
    const { proof } = data;
    reindeerProof = proof;
  }

  let santaProof = [];
  ({ data, error } = useSWR(active ? `/api/santaProof?address=${account}` : null, { fetcher, refreshInterval: 0 }));
  if (!error && data) {
    const { proof } = data;
    santaProof = proof;
  }

  return (
    <main>
      <Navigation />
      <h1 className="masthead">
        {t.rich('title')}
      </h1>
      <article className='center'>
        {!active ?
        (<PrimaryButton onClick={connect}>
          Connect Wallet
        </PrimaryButton>)
        : <PrimaryButton onClick={disconnect}>
          Disconnect Wallet
        </PrimaryButton>
        }
       <p>{account ? ENSName || abridgeAddress(account): "Please connect account"}</p>
        <PrimaryButton>
          Mint Elf
        </PrimaryButton>
        <PrimaryButton>
          Mint Reindeer
        </PrimaryButton>
        <div>
          Santa Proof: {santaProof}
        </div>

        <div>
          Elf proof: {elfProof}
        </div>

        <div>
          Reindeer proof: {reindeerProof}
        </div>
      </article>
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

const PrimaryButton = styled.button`
  font-family: 'Space Mono', monospace;
  background-color: #236357;
  border: none;
  padding: .5rem;
  border-radius: 5px;
  color: #36ECAC;
  text-transform: uppercase;
  gap: .5rem;
  font-size: 1.5em;
  text-decoration: none;
  margin-left: 2rem;
  margin-right: 2rem;
`;
