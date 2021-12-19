import Image from 'next/image';
import { styled as muiStyled } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useMemo } from 'react';

export default function Nft(props) {
  const t = useTranslations('nft');
  const { name, value, image, claimable, onMint, active, mintStatus } = props;

  const message = useMemo(() => {
    console.log('message', active, claimable, mintStatus)
    if (!active) {
      return t('connectWallet');
    } else if (!claimable) {
      return t('notEligible');
    } else if (claimable ){
      return t('readyToClaim');
    } else if (mintStatus) {
      return t('successful');
    } else {
      return t('unsuccessful');
    }
  }, [t, active, claimable, mintStatus])

  return (
    <div
      className="card"
      style={{
        padding: "1.25rem",
        marginTop: "0.75rem",
        borderRadius: "5px",
        background: "rgba(130, 255, 172, 0.5)",
        backdropFilter: "blur(2px)"
      }}>
        <Stack spacing={1}>
            <Image
              className='nftImage'
              alt="nft image"
              src={image}
              width={300}
              height={300}
            />
            <div style={{paddingTop: '1rem'}}>
              <h3 style={{color: 'white'}}>{name.toUpperCase()}</h3>
            </div>
            <h3 style={{color: '#A8EAB6', paddingTop: '0.5rem'}}>{value}</h3>
            {!claimable && <h4 style={{color: '#A8EAB6'}}>{message}</h4>}
            {claimable && <h4 style={{color: '#A8EAB6'}}>{message}</h4>}
            <CustomButton
              variant="contained"
              disabled={!claimable}
              disableElevation
              color="secondary"
              onClick={onMint}
            >
              {t('mint').toUpperCase()}
            </CustomButton>
        </Stack>
    </div>
  )
}

const CustomButton = muiStyled(Button)(({ theme }) => ({
  color: '#10392A',
  backgroundColor: '#A7EAB6',
  height: '35px',
  fontSize: '1.2rem',
  fontFamily: [
    'Labil Grotesk Basic',
    'Space Mono,monospace',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
}));