import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Image from 'next/image';

export default function ConnectModal(props) {
  const { isModalVisible, handleClose, handleLoginClick } = props;
  return (
    <>
      <Modal
        open={isModalVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Coinbase onClick={() => handleLoginClick('coinbase')}>
            <Image
              src="/wallets/coinbase.png"
              height={60}
              width={320}
              alt="login with Coinbase Wallet!"
            />
          </Coinbase>
          <WalletConnect onClick={() => handleLoginClick('walletconnect')}>
          <Image
              src="/wallets/walletconnect.svg"
              height={100}
              width={300}
              alt="login with Wallet Connect!"
            />
          </WalletConnect>
          <Metamask onClick={() => handleLoginClick('metamask')}>
            <Image
              src="/wallets/metamask.svg"
              height={100}
              width={300}
              alt="login with Metamask!"
            />
          </Metamask>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px',
  boxShadow: 24,
  p: 4,
};

export const Coinbase = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
`

export const WalletConnect = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #eee;
`

export const Metamask = styled.div`
  cursor: pointer;
`