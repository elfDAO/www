
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";

const { ALCHEMY_KEY }  = process.env;
const alchemyUrl = `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyUrl);

const contractABI = require("../data/elfNFTABI.json");
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A";

export const elfDAONFT = new web3.eth.Contract(contractABI.abi, contractAddress);

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export function abridgeAddress(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export const useENSName = (address, library) => {
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
