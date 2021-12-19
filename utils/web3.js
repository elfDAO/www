
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

/** Do not destructure env variables */
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const ELFNFT_ADDRESS = process.env.ELFNFT_ADDRESS;
const NETWORK = process.env.NETWORK;

const alchemyUrl = `https://eth-${NETWORK}.alchemyapi.io/v2/${ALCHEMY_KEY}`;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
export const web3 = createAlchemyWeb3(alchemyUrl);

const contractABI = require("../data/elfNFTABI.json");
const contractAddress = ELFNFT_ADDRESS;

export const elfDAONFT = new web3.eth.Contract(contractABI.abi, contractAddress);

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
export const walletConnect = new WalletConnectConnector({alchemyUrl: alchemyUrl});

export const walletlink = new WalletLinkConnector({
  url: alchemyUrl,
  appName: 'elfDAO',
  supportedChainIds: [1, 3, 4, 5, 42]
})

export const mintElf = async (contract, account, proof) => {
  console.log('minting elf...');
  contract.methods.mintElf(proof).send({ from: account }).then((result) => {
    console.log({
      success: true,
      status: `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` + result
      });
  }).catch((err) => {
    console.log("Mint transaction failed!");
    console.log(err);
  });

  // const tx = {
  //   'from': account,
  //   'to': contractAddress,
  //   'data': elfDAONFT.methods.mintElf(proof).send({from: account}).encodeABI()
  // };

//   try {
//     const txHash = await ethereum
//         .request({
//             method: 'eth_sendTransaction',
//             params: [tx],
//         });
//     return {
//         success: true,
//         status: `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` + txHash
//     }
//  } catch (error) {
//     return {
//         success: false,
//         status: "😥 Something went wrong: " + error.message
//     }
//   }
}

export const mintReindeer = async (account, proof, ethereum) => {
  console.log('minting reindeer...', account, proof);
  const tx = {
    'from': account,
    'to': contractAddress,
    'gas': '200000', // set the gas limit
    'data': elfDAONFT.methods.mintReindeer(proof).encodeABI()
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
          console.log('ENS name', name);
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
