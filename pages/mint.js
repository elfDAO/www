
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import Navigation from '../components/Navigation';
import React from 'react';
import { web3, injected, useENSName, abridgeAddress, mintElf, mintReindeer, mintSanta } from '../utils/web3';
import { useWeb3React } from '@web3-react/core';
import Button from '@mui/material/Button';
import Connect from '../components/connect';

export default function MintInstructions() {
  const t = useTranslations('mint');
  const fetcher = (url) => fetch(url).then((res) => res.json());

  // set up contract abi
  const contractABI = require("../data/elfNFTABI.json");
  const contractAddress = process.env.ELFNFT_ADDRESS;
  const elfDAONFT = new web3.eth.Contract(contractABI.abi, contractAddress);

  const { library, active, account, activate, deactivate } = useWeb3React();

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
    const { success, status } = await mintElf(elfDAONFT, account, elfProof);
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
        <Connect />
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
