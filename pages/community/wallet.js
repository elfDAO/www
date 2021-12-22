import { useTranslations } from 'next-intl';
import Navigation from "@components/Navigation";
import { useWeb3React } from '@web3-react/core';
import Footer from "@components/footer";
import { useEffect, useState } from 'react';
import { elfDAONFT, giftToken } from '@src/pages/utils/_web3';

export default function Wallet() {
  const t = useTranslations('community');
  const { active, account } = useWeb3React();
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [giftBalance, setGiftBalance] = useState();

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
      giftToken.methods.balanceOf(account).call().then((result) => {
        const resultDec = parseFloat(result, 10);
        const resultDiv = resultDec/1e18;
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
  // const contract_address = process.env.NEXT_PUBLIC_ELFNFT_ADDRESS;
  // useEffect(() => {
  //   const response = axios.get(`https://api.opensea.io/api/v1/assets?owner=${account}&asset_contract_address=${contract_address}&order_direction=desc&offset=0&limit=20`);
  // }, []);

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

