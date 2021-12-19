import { useState } from "react";
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import { useWeb3React } from '@web3-react/core';
import { abridgeAddress, injected, useENSName, walletConnect, walletlink } from '../utils/web3';
import ConnectModal from "./subcomponents/connectModal";

export default function Connect() {
  const { activate, deactivate, active, account, library } = useWeb3React();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const walletConnectConnector = walletConnect;
  const handleClose = () => setIsModalVisible(false);
  const handleOpen = () => setIsModalVisible(true);

  const handleBodyScroll = () => {
    document.body.style.overflow = 'visible';
  }

  const handleLoginClick = async (type) => {
    if (type === 'coinbase') {
      await activate(walletlink);
    } else if (type === 'metamask') {
      await activate(injected);
    } else {
      await activate(walletConnectConnector);
    }
    handleBodyScroll();
    handleClose();
  }

  const handleLogoutClick = async () => {
    await deactivate();
  }

  const ENSName = useENSName(account, library);

  return (
    <div>
    {!active ? (
      <Button variant="contained"
        style={{
                backgroundColor: '#236357 !important'
              }}
        color="secondary"
        onClick={handleOpen}>
          Connect Wallet
        </Button>) :
    <div>
      <Connected>
        <Stack></Stack>
        <p>{account && (ENSName || abridgeAddress(account))}</p>
        <Button variant="contained" disableElevation size="small" onClick={handleLogoutClick}>Disconnect</Button>
      </Connected>
    </div>
    }
    <ConnectModal
      isModalVisible={isModalVisible}
      handleLoginClick={handleLoginClick}
    />
    </ div>
  )
}

export const Connected = styled.div`
  width: 240px;
  height: 50px;
  background: #236357;
  border-radius: 5px;
`
