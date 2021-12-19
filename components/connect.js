import { useState } from "react";
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { useWeb3React } from '@web3-react/core';
import { abridgeAddress, injected, useENSName, walletConnect, walletlink } from '../pages/utils/_web3';
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
    <div>
      <Connected>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" height={"100%"}>
          <p>{account && (ENSName || abridgeAddress(account))}</p>
          <Button variant="contained" disableElevation size="small" onClick={handleLogoutClick}>Disconnect</Button>
        </Stack>
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

const CustomButton = muiStyled(Button)(({ theme }) => ({
  color: '#36ECAC',
  backgroundColor: '#236357',
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
  width: 250px;
  background: #236357;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  height: 45px;
  padding-left: 5px;
  padding-right: 5px;
`
