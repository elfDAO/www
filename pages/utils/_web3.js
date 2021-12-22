
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { useEffect, useState } from "react";
import Web3 from 'web3';

/** Do not destructure env variables */
const INFURA_ID =  process.env.NEXT_PUBLIC_INFURA_ID;
const ELFNFT_ADDRESS = process.env.NEXT_PUBLIC_ELFNFT_ADDRESS;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

const web3 = new Web3(Web3.givenProvider)
const contractABI = require("/data/elfNFTABI.json");
const contractAddress = ELFNFT_ADDRESS;

const acceptedChains = ENVIRONMENT === 'development' ? [1, 3, 4, 5, 42] : [1, 2];

export const elfDAONFT = new web3.eth.Contract(contractABI.abi, contractAddress);

const giftTokenAddress = "0x4b2697AB3F0793160B566b92188e20c88b24C831";
const giftTokenABI = require("/data/giftABI.json");
export const giftToken = new web3.eth.Contract(giftTokenABI.abi, giftTokenAddress);

export const injected = new InjectedConnector({ supportedChainIds: acceptedChains, });
export const walletConnect = new WalletConnectConnector({
  infuraId: INFURA_ID,
  supportedChainIds: acceptedChains,
});

export const walletlink = new WalletLinkConnector({
  appName: 'elfDAO',
  supportedChainIds: acceptedChains,
})

export const mintElf = async (account, proof) => {
  console.log('minting elf...');
  const result = elfDAONFT.methods.mintElf(proof).send({ from: account }).then((result) => {
    console.log(`✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` + result);
      return {
        success: true,
        status: `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` + result
        };
  }).catch((err) => {
    console.log("Mint transaction failed!");
    return {
      success: false,
      status: "😥 Something went wrong: " + err.message
      }
  }).finally((result) => {
    return result;
  });
  return result;
}

export const mintReindeer = async (account, proof) => {
  console.log('minting reindeer...');
  const result = elfDAONFT.methods.mintReindeer(proof).send({ from: account }).then((result) => {
      return {
        success: true,
        status: `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` + result
        };
  }).catch((err) => {
    return {
      success: false,
      status: "😥 Something went wrong: " + err.message
      }
  });
  return result;
};

  export const mintSanta = async (account, proof, ethereum) => {
    console.log('minting santa...')
    const result = elfDAONFT.methods.mintSanta(proof).send({ from: account }).then((result) => {
      console.log(`✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` + result);
        return {
          success: true,
          status: `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` + result
          };
    }).catch((err) => {
      console.log("Mint transaction failed!");
      return {
        success: false,
        status: "😥 Something went wrong: " + err.message
        }
    });
    return result;
};

export function abridgeAddress(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export const useENSName = (library, address) => {
  const [ENSName, setENSName] = useState("");
  useEffect(() => {
    if (library && typeof address === "string") {
      let stale = false;

      library
        .lookupAddress(address)
        .then((name) => {
          if (!stale && typeof name === "string") {
            setENSName(name);
          }
        })
        .catch(() => {});

      return () => {
        stale = true;
        setENSName("");
      };
    }
  }, [library, address]);

  return ENSName;
}

export default function blank() { return <></>}
