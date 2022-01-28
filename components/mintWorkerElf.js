import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Stack } from "@mui/material";
import Nft from "@components/subcomponents/NftCard";
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { elfDAONFT, mintWorkerElf } from '@src/pages/utils/_web3';
import { useWeb3React } from '@web3-react/core';
import Connect from "@components/connect";

const NOT_CLAIMABLE = 0;
const ALREADY_CLAIMED = 1;
const CLAIMABLE = 2;

export default function MintWorkerElves() {
  const t = useTranslations('nft');
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { active, account, chainId } = useWeb3React();

  // 0: not claimable
  // 1: already claimed
  // 2: claimable
  const [claimable, setClaimable] = useState(NOT_CLAIMABLE);
  const [mintStatus, setMintStatus] = useState();

  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  useEffect(() => {
    if (!active || !account) {
      setAlreadyClaimed(false);
      return;
    }
    async function checkIfClaimed() {
      elfDAONFT.methods.claimed(account).call({ from: account }).then((result) => {
        setAlreadyClaimed(result);
      }).catch((err) => {
        setAlreadyClaimed(false);
      });
    }
    checkIfClaimed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  let workerElfProof = [];
  let workerElfValid = false;
  let { data, error } = useSWR(active && account ? `/api/workerElfProof?address=${account}` : null, {
    fetcher,
    fetcher, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false
  });
  if (!error && data) {
    const { proof, valid } = data;
    console.log('workerElfProof', valid, proof);
    workerElfProof = proof;
    workerElfValid = valid;
  }

  useEffect(() => {
    if (!active || !workerElfValid) {
      setClaimable(NOT_CLAIMABLE);
      return;
    } else if (alreadyClaimed) {
      setClaimable(ALREADY_CLAIMED);
      return;
    }
    async function validateElfClaim() {
      elfDAONFT.methods.mintWorkerElf(workerElfProof).call({ from: account }).then(() => {
        setClaimable(CLAIMABLE);
        console.log('workerElfProof claimable');
      }).catch((err) => {
        console.log('workerElfProof not claimable', err);
        if (err.toString().includes('claimed')) { setClaimable(ALREADY_CLAIMED) }
        else { setClaimable(NOT_CLAIMABLE) }
      });
    }
    validateElfClaim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workerElfProof])

  const onMintWorkerElf = async () => {
    const { success, status } = await mintWorkerElf(account, workerElfProof);
    console.log(status);
    setMintStatus(success);
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
      <Grid container width="100%" spacing={{ xs: 0, sm: 2 }} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
        <Grid item>
          <Nft
            name={'worker elf'}
            value={'For our wonderful elfDAO team'}
            image={'/elf.svg'}
            active={active}
            mintStatus={mintStatus}
            claimable={claimable}
            onMint={onMintWorkerElf}
          />
        </Grid>
      </Grid>
      <p><i>*A wallet may only claim up to one NFT </i></p>
    </Stack>
  )
}