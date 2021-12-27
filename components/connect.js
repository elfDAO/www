import { useState } from "react";
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { useWeb3React } from '@web3-react/core';
import { abridgeAddress, injected, useENSName, walletConnect, walletlink } from '../pages/utils/_web3';
import ConnectModal from "./subcomponents/connectModal";

export default function Connect() {
  const { activate, deactivate, active, account, library, chainId } = useWeb3React();
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

  const ENSName = useENSName(library, account);

  return (
    <div>
    {!active ? (
      <CustomButton variant="contained"
        disableElevation
        onClick={handleOpen}>
          Connect Wallet
        </CustomButton>
        ) :
      <Connected>
        <p style={{ padding: "0 5px" }}>{account && (ENSName || abridgeAddress(account))}</p>
        <DisconnectButton variant="contained" disableElevation size="small" onClick={handleLogoutClick}>Disconnect</DisconnectButton>
      </Connected>
    }
    <ConnectModal
      isModalVisible={isModalVisible}
      handleLoginClick={handleLoginClick}
      handleClose={handleClose}
    />
    </ div>
  )
}

const DisconnectButton = muiStyled(Button)(({ theme }) => ({
  fontSize: '1rem',
  borderRadius: '20px',
  background: 'rgba(7, 24, 18, 0.3)',
  color: 'rgba(255,255,255,0.7)',
  padding: '0 1rem',
  fontFamily: [
    'Space Mono,monospace',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
}))

const CustomButton = muiStyled(Button)(({ theme }) => ({
  color: '#36ECAC',
  backgroundColor: 'rgba(25, 171, 166, 0.2)',
  borderRadius: '20px',
  height: '45px',
  fontSize: '1.2rem',
  fontFamily: [
    'Space Mono,monospace',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
}));

export const Connected = styled.div`
  box-sizing:border-box;
  background: rgba(25, 171, 166, 0.2);
  border-radius:20px;
  display:flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  gap: 10px;
  padding:0 5px 0 10px;
  overflow:hidden;
  white-space: nowrap;
`
