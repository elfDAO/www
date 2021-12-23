import { useTranslations } from 'next-intl';
import Navigation from "@components/Navigation";
import { useWeb3React } from '@web3-react/core';
import Footer from "@components/footer";
import { useEffect, useState } from 'react';
import { elfDAONFT, giftToken } from '@src/pages/utils/_web3';
import axios from 'axios';
import Image from 'next/image';
import { Stack } from '@mui/material';

export default function Wallet() {
  const t = useTranslations('community');
  const { active, account, chainId } = useWeb3React();
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [giftBalance, setGiftBalance] = useState();
  const [displayTokens, setDisplayTokens] = useState([]);

  useEffect(() => {
    if (!active || !account) {
      setAlreadyClaimed(false);
      return;
    }
    async function checkIfClaimed() {
      elfDAONFT.methods.claimed(account).call({ from: account }).then((result) => {
        setAlreadyClaimed(result);
      }).catch((err) => {
        console.log('err', err);
        setAlreadyClaimed(false);
      });
    }
    checkIfClaimed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  // this method only works on mainnet
  useEffect(() => {
    if (!active || !account) {
      return;
    }
    async function checkGiftBalance() {
      giftToken.methods.balanceOf('0xe694854b8f3E624b8C5E3b9A978AEb893F658f4B').call().then((result) => {
        const resultDec = parseFloat(result, 10);
        const resultDiv = resultDec/1e18;
        console.log('gift token balance', result, resultDec, resultDiv);
        setGiftBalance(resultDiv);
      }).catch((err) => {
        console.log('err', err);
        setGiftBalance(0);
      });
    }
    checkGiftBalance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  // TODO: pull nft information
  const contract_address = process.env.NEXT_PUBLIC_ELFNFT_ADDRESS;
  useEffect(() => {
    if (!active || !account) {
      return;
    }
    async function getContractInfo() {
      try {
        const response = await axios.get(
          `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&asset_contract_address=${contract_address}`);
          console.log(response.data.assets);
        setDisplayTokens(Array(response.data.assets));
      } catch (err) {
        console.log(err);
      }
    }
    getContractInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <main>
        <Navigation />
        <header>
          <h1 className="masthead">
            {t.rich('yourWallet', { br: () => <br />})}
          </h1>
          {active ?
          <div>
            {giftBalance > 0 || alreadyClaimed ?
              <div>
                <h2 style={{paddingBottom: '1.5rem', color: '#36ECAC', textAlign:"center"}}>{t('thankYou')}</h2>
                <p className="manifesto center">{t('giftBalance')}: {giftBalance}</p>
                {displayTokens.map((token, i) => {
                  return <Stack
                      key={i}
                      paddingTop={4}
                      paddingBottom={4}
                      width={'100%'}
                      justifyContent="center"
                      alignItems="center"
                    >
                    {token.image_url ? <Image alt="nft" height={350} width={350} src={token.image_url} /> :
                    <Image alt="nft" height={350} width={350} src={'/not-available.png'} /> }
                    <p className="manifesto center">{token.name}</p>
                  </Stack>
                })}
              </div> :
              <div>
                <h2 style={{paddingBottom: '1.5rem', color: '#36ECAC', textAlign:"center"}}>
                  {t.rich('getStarted', {
                    link: (children) => <a className="link" href="https://docs.elfdao.com/donate-and-mint" target="_blank" rel="noreferrer">{children} </a>,
                  })}
                </h2>
              </div>
            }
            <h2 style={{paddingBottom: '1.5rem', color: '#36ECAC', textAlign:"center"}}>...</h2>
            <h2 style={{paddingBottom: '1.5rem', color: '#36ECAC', textAlign:"center"}}>{t('tagline')}</h2>
          </div> :
            <h2 style={{paddingBottom: '1.5rem', color: '#36ECAC', textAlign:"center"}}>{t('connectWallet')}</h2>
          }
        </header>
      </main>
      <Footer />
    </>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
}

