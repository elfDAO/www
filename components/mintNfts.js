import { Grid, Stack } from "@mui/material";
import Nft from "./subcomponents/NftCard";
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import React from 'react';
import { web3, mintElf, mintReindeer, mintSanta } from '../pages/utils/_web3';
import { useWeb3React } from '@web3-react/core';
import Connect from "./connect";

export default function MintNFTs() {
  const t = useTranslations('nft');
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { active, account } = useWeb3React();

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
    const { success, status } = await mintElf(account, elfProof);
    console.log(success, status);
  };

  const onMintReindeer = async () => {
    const { success, status } = await mintReindeer(account, reindeerProof);
    console.log(success, status);
  };

  const onMintSanta = async () => {
    const { success, status } = await mintSanta(account, santaProof);
    console.log(success, status);
  };

  return (
    <Stack spacing={1} alignItems={'center'}>
      <Connect />
      <Grid container width="100%" spacing={{xs: 0, sm: 2}} direction={{xs: 'column', sm: 'row'}} justifyContent="center">
        <Grid item>
          <Nft
            name={t('elf')}
            value={'Contributions > 0.1 ETH'}
            image={'/elf.svg'}
            claimable={elfValid}
            onMint={onMintElf}
          />
        </Grid>
        <Grid item>
          <Nft
            name={t('reindeer')}
            value={'Contributions > 0.5 ETH'}
            image={'/reindeer.svg'}
            claimable={reindeerValid}
            onMint={onMintReindeer}
          />
        </Grid>
        <Grid item>
          <Nft
            name={t('santa')}
            value={'Top 5 Contributers'}
            image={'/santa.svg'}
            claimable={santaValid}
            onMint={onMintSanta}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}