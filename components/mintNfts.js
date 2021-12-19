import { Grid, Stack } from "@mui/material";
import Nft from "./subcomponents/NftCard";
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { elfDAONFT, mintElf, mintReindeer, mintSanta } from '../pages/utils/_web3';
import { useWeb3React } from '@web3-react/core';
import Connect from "./connect";

export default function MintNFTs() {
  const t = useTranslations('nft');
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { active, account } = useWeb3React();

  // 0: not claimable
  // 1: already claimed
  // 2: claimable
  const [elfClaimable, setElfClaimable] = useState(0);
  const [reindeerClaimable, setReindeerClaimable] = useState(0);
  const [santaClaimable, setSantaClaimable] = useState(0);

  const [elfMintStatus, setElfMintStatus] = useState();
  const [reindeerMintStatus, setReindeerMintStatus] = useState();
  const [santaMintStatus, setSantaMintStatus] = useState();

  let elfProof = [];
  let elfValid = false;
  let { data, error } = useSWR(active ? `/api/elfProof?address=${account}` : null, { fetcher, refreshInterval: 0 });
  if (!error && data) {
    const { proof, valid  } = data;
    elfProof = proof;
    elfValid = valid;
  }

    useEffect(() => {
    if (!active || !elfValid) { setElfClaimable(0) }
    async function validateElfClaim() {
      elfDAONFT.methods.mintElf(elfProof).call({ from: account }).then(() => {
        setElfClaimable(1);
      }).catch((err) => {
        if (err.toString().includes('claimed')) { setElfClaimable(2)}
        else { setElfClaimable(1) }
      });
    }
    validateElfClaim();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, account])

  let reindeerProof = [];
  let reindeerValid = false;
  ({ data, error } = useSWR(active ? `/api/reindeerProof?address=${account}` : null, { fetcher, refreshInterval: 0 }));
  if (!error && data) {
    const { proof, valid } = data;
    reindeerProof = proof;
    reindeerValid = valid;
  }

  useEffect(() => {
    if (!active || !reindeerValid) { setReindeerClaimable(0) }
    async function validateReindeerClaim() {
      elfDAONFT.methods.mintReindeer(elfProof).call({ from: account }).then(() => {
        setReindeerClaimable(1);
      }).catch((err) => {
        if (err.toString().includes('claimed')) { setReindeerClaimable(2)}
        setReindeerClaimable(0);
      });
    }
    validateReindeerClaim();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, account])

  let santaProof = [];
  let santaValid = false;
  ({ data, error } = useSWR(active ? `/api/santaProof?address=${account}` : null, { fetcher, refreshInterval: 0 }));
  if (!error && data) {
    const { proof, valid } = data;
    santaProof = proof;
    santaValid = valid;
  }

  useEffect(() => {
    if (!active || !santaValid) { setSantaClaimable(0) }
    async function validateSantaClaim() {
      elfDAONFT.methods.mintReindeer(elfProof).call({ from: account }).then(() => {
        setSantaClaimable(1);
      }).catch((err) => {
        if (err.toString().includes('claimed')) { setSantaClaimable(2)}
        setSantaClaimable(0);
      });
    }
    validateSantaClaim();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, account])

  const onMintElf = async () => {
    const { success, status } = await mintElf(account, elfProof);
    console.log(success, status);
    setElfMintStatus(success);
  };

  const onMintReindeer = async () => {
    const { success, status } = await mintReindeer(account, reindeerProof);
    console.log(success, status);
    setReindeerMintStatus(success);
  };

  const onMintSanta = async () => {
    const { success, status } = await mintSanta(account, santaProof);
    console.log(success, status);
    setSantaMintStatus(success);
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
            active={active}
            mintStatus={elfMintStatus}
            claimable={elfClaimable}
            onMint={onMintElf}
          />
        </Grid>
        <Grid item>
          <Nft
            name={t('reindeer')}
            value={'Contributions > 0.5 ETH'}
            image={'/reindeer.svg'}
            mintStatus={reindeerMintStatus}
            active={active}
            claimable={reindeerClaimable}
            onMint={onMintReindeer}
          />
        </Grid>
        <Grid item>
          <Nft
            name={t('santa')}
            value={'Top 5 Contributers'}
            image={'/santa.svg'}
            mintStatus={santaMintStatus}
            active={active}
            claimable={santaClaimable}
            onMint={onMintSanta}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}