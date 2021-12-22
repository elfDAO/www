import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Stack } from "@mui/material";
import Nft from "@components/subcomponents/NftCard";
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { elfDAONFT, mintElf, mintReindeer } from '@src/pages/utils/_web3';
import { useWeb3React } from '@web3-react/core';
import Connect from "@components/connect";

const NOT_CLAIMABLE = 0;
const ALREADY_CLAIMED = 1;
const CLAIMABLE = 2;

export default function MintNFTs(props) {
  const t = useTranslations('nft');
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { active, account, chainId } = useWeb3React();

  // 0: not claimable
  // 1: already claimed
  // 2: claimable
  const [elfClaimable, setElfClaimable] = useState(NOT_CLAIMABLE);
  const [reindeerClaimable, setReindeerClaimable] = useState(0);

  const [elfMintStatus, setElfMintStatus] = useState();
  const [reindeerMintStatus, setReindeerMintStatus] = useState();

  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  useEffect(() => {
    if (!active || !account) {
      setAlreadyClaimed(false);
      return;
    }
    async function checkIfClaimed() {
      elfDAONFT.methods.claimed(account).call({ from: account }).then((result) => {
        console.log('claimed', result);
        setAlreadyClaimed(result);
      }).catch((err) => {
        setAlreadyClaimed(false);
      });
    }
    checkIfClaimed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  let elfProof = [];
  let elfValid = false;
  let { data, error } = useSWR(active && account ? `/api/elfProof?address=${account}` : null, { fetcher,
    fetcher, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });
  if (!error && data) {
    const { proof, valid  } = data;
    elfProof = proof;
    elfValid = valid;
  }

    useEffect(() => {
    if (!active || !elfValid) {
      setElfClaimable(NOT_CLAIMABLE);
      return;
    } else if (alreadyClaimed) {
      setElfClaimable(ALREADY_CLAIMED);
      return;
    }
    async function validateElfClaim() {
      elfDAONFT.methods.mintElf(elfProof).call({ from: account }).then(() => {
        setElfClaimable(CLAIMABLE);
      }).catch((err) => {
        if (err.toString().includes('claimed')) { setElfClaimable(ALREADY_CLAIMED)}
        else { setElfClaimable(NOT_CLAIMABLE) }
      });
    }
    validateElfClaim();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elfProof])

  let reindeerProof = [];
  let reindeerValid = false;
  ({ data, error } = useSWR(active && account ? `/api/reindeerProof?address=${account}` : null, {
    fetcher, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }));
  if (!error && data) {
    const { proof, valid } = data;
    reindeerProof = proof;
    reindeerValid = valid;
  }

  useEffect(() => {
    if (!active || !reindeerValid) {
      setReindeerClaimable(NOT_CLAIMABLE);
      return;
    } else if (alreadyClaimed) {
      setReindeerClaimable(ALREADY_CLAIMED);
      return;
    }
    async function validateReindeerClaim() {
      elfDAONFT.methods.mintReindeer(reindeerProof).call({ from: account }).then(() => {
        setReindeerClaimable(CLAIMABLE);
      }).catch((err) => {
        console.log('validateReindeerClaim', err);
        if (err.toString().includes('claimed')) { setReindeerClaimable(ALREADY_CLAIMED)}
        else {setReindeerClaimable(NOT_CLAIMABLE)}

      });
    }
    validateReindeerClaim();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reindeerProof])

  const onMintElf = async () => {
    const { success, status } = await mintElf(account, elfProof);
    console.log(status);
    setElfMintStatus(success);
  };

  const onMintReindeer = async () => {
    const { success, status } = await mintReindeer(account, reindeerProof);
    console.log(status);
    setReindeerMintStatus(success);
  };

  const notOnCorrectNetwork = useMemo(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
      return active && chainId !== 1; // eth chain id
    } else {
      return active && chainId !== 4; // rinkeby chain id
    }
  }, [active, chainId]);

  return (
    <Stack spacing={2} alignItems={'center'}>
      <Connect />
      {notOnCorrectNetwork && <p>{process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? t('connectMainnet') : t('connectRinkeby')}</p>}
      <Grid container width="100%" spacing={{xs: 0, sm: 2}} direction={{xs: 'column', sm: 'row'}} justifyContent="center">
        <Grid item>
          <Nft
            name={t('elf')}
            value={'Contributions of 0.1 ETH or more'}
            image={'/elf.svg'}
            active={active}
            mintStatus={elfMintStatus}
            claimable={elfClaimable}
            onMint={onMintElf}
          />
          <p>elfClaimable: {elfClaimable}, proofValid: {elfValid.toString()}</p>
        </Grid>
        <Grid item>
          <Nft
            name={t('reindeer')}
            value={'Contributions of 0.5 ETH or more'}
            image={'/reindeer.svg'}
            mintStatus={reindeerMintStatus}
            active={active}
            claimable={reindeerClaimable}
            onMint={onMintReindeer}
          />
          <p>reindeerClaimable: {reindeerClaimable}, proofValid: {reindeerValid.toString()}</p>
        </Grid>
        <Grid item>
          <Nft
            name={t('santa')}
            value={'Top 5 Contributors'}
            image={'/santa.svg'}
            active={active}
            claimable={0}
          />
        </Grid>
      </Grid>
      <p><i>*A wallet may only claim a reindeer <strong>or</strong> an elf depending on their contribution level. Top 5 contributors will be eligible for both a reindeer and a santa token.</i></p>
    </Stack>
  )
}