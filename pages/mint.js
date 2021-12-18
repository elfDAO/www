
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import Navigation from '../components/Navigation';
import styled from 'styled-components';
import React from 'react';
import { injected, useENSName, abridgeAddress, mintElf, mintReindeer, mintSanta } from '../utils/web3';
import { useWeb3React } from '@web3-react/core';
import { Button } from '@material-ui/core';

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
        (<Button variant="contained" onClick={connect}>
          Connect Wallet
        </Button>)
        : <Button variant="contained" onClick={disconnect}>
          Disconnect Wallet
        </Button>
        }
       <p>{account ? ENSName || abridgeAddress(account): "Please connect account"}</p>
        <Button variant="contained" onClick={onMintElf} disabled={!elfValid}>
          Mint Elf
        </Button>
        <Button variant="contained" onClick={onMintReindeer} disabled={!reindeerValid}>
          Mint Reindeer
        </Button>
        <Button variant="contained" onClick={onMintSanta} disabled={!santaValid}>
          Mint Santa
        </Button>
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
