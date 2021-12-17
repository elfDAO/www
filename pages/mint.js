
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import Navigation from '../components/Navigation';
import styled from 'styled-components';
import React from 'react';
import { injected, useENSName, abridgeAddress, mintElf, mintReindeer, mintSanta } from '../utils/web3';
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
  let elfValid = false;
  let { data, error } = useSWR(active ? `/api/elfProof?address=${account}` : null, { fetcher, refreshInterval: 0 });
  if (!error && data) {
    const { proof, valid  } = data;
    elfProof = proof;
    elfValid = valid;
  }

  let reindeerProof = [];
  let reindeerValid = false;
  ({ data, error } = useSWR(active ? `/api/reindeerProof?address=${account}` : null, { fetcher, refreshInterval: 0 }));
  if (!error && data) {
    const { proof, valid } = data;
    reindeerProof = proof;
    reindeerValid = valid;
  }

  let santaProof = [];
  let santaValid = false;
  ({ data, error } = useSWR(active ? `/api/santaProof?address=${account}` : null, { fetcher, refreshInterval: 0 }));
  if (!error && data) {
    const { proof, valid } = data;
    santaProof = proof;
    santaValid = valid;
  }

  const onMintElf = async () => {
    const { success, status } = await mintElf(account, elfProof, window.ethereum);
    console.log(success, status);
  };

  const onMintReindeer = async () => {
    const { success, status } = await mintReindeer(account, reindeerProof, window.ethereum);
    console.log(success, status);
  };

  const onMintSanta = async () => {
    const { success, status } = await mintSanta(account, santaProof, window.ethereum);
    console.log(success, status);
  };

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
        <PrimaryButton onClick={onMintElf} disabled={!elfValid}>
          Mint Elf
        </PrimaryButton>
        <PrimaryButton onClick={onMintReindeer} disabled={!reindeerValid}>
          Mint Reindeer
        </PrimaryButton>
        <PrimaryButton onClick={onMintSanta} disabled={!santaValid}>
          Mint Santa
        </PrimaryButton>
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
