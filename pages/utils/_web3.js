
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from 'web3';

/** Do not destructure env variables */
const INFURA_ID =  process.env.INFURA_ID;
const ELFNFT_ADDRESS = process.env.ELFNFT_ADDRESS;
const NETWORK = process.env.NETWORK;
console.log('ELFNFT_ADDRESS', process.env.ELFNFT_ADDRESS, 'NETWORK', NETWORK)

const web3 = new Web3(Web3.givenProvider)
const contractABI = require("/data/elfNFTABI.json");
const contractAddress = ELFNFT_ADDRESS;

export const elfDAONFT = new web3.eth.Contract(contractABI.abi, contractAddress);

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
export const walletConnect = new WalletConnectConnector({
  infuraId: INFURA_ID,
});

export const walletlink = new WalletLinkConnector({
  appName: 'elfDAO',
  supportedChainIds: [1, 3, 4, 5, 42]
})

export const mintElf = async (account, proof) => {
  console.log('minting elf...');
  elfDAONFT.methods.mintElf(proof).send({ from: account }).then((result) => {
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
}

export const mintReindeer = async (account, proof) => {
  console.log('minting reindeer...', account, proof);
  elfDAONFT.methods.mintReindeer(proof).send({ from: account }).then((result) => {
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
};

  export const mintSanta = async (account, proof, ethereum) => {
    console.log('minting santa...')
    const tx = {
      'from': account,
      'to': contractAddress,
      'gas': '200000', // set the gas limit
      'data': elfDAONFT.methods.mintSanta(proof).encodeABI()
    };
    try {
      const txHash = await ethereum
          .request({
              method: 'eth_sendTransaction',
              params: [tx],
          });
      return {
          success: true,
          status: `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` + txHash
      }
  } catch (error) {
    return {
        success: false,
        status: "😥 Something went wrong: " + error.message
    }
  }
};

export function abridgeAddress(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export const useENSName = (address) => {
  const [ENSName, setENSName] = useState("");
  const { library, chainId } = useWeb3React();

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
  }, [library, address, chainId]);

  return ENSName;
}
