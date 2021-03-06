import Image from 'next/image';
import { styled as muiStyled } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useMemo } from 'react';

const ALREADY_CLAIMED = 1;
const CLAIMABLE = 2;

export default function Nft(props) {
  const t = useTranslations('nft');
  const { name, value, image, claimable, onMint, active, mintStatus } = props;

  const message = useMemo(() => {
    if (!active) {
      return t('connectWallet');
    } else if (claimable === ALREADY_CLAIMED){
      return t('alreadyClaimed');
    } else if (mintStatus) {
      return t('successful')
    } else if (mintStatus === false) {
      return t('unsuccessful');
    } else if (claimable === CLAIMABLE) {
      return t('readyToClaim');
    } else { // NOT_CLAIMABLE
      return t('notEligible');
    }
  }, [t, active, claimable, mintStatus])

  return (
    <div
      className="card"
      style={{
        padding: "1.25rem",
        marginBottom: "0.75rem",
        borderRadius: "5px",
        backgroundColor: "rgba(130, 255, 172, 0.1)",
        background: "linear-gradient(to bottom right, rgba(130, 255, 172, 0.2), rgba(130, 255, 172, 0.05))",
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
              <h3 style={{color: 'white', fontFamily: '"Space Mono", sans-serif', marginBottom: 0}}>{name.toUpperCase()}</h3>
            </div>
            <h3 style={{color: '#A8EAB6', marginTop: 0}}>{value}</h3>
            <h4 style={{color: '#A8EAB6'}}>{message}</h4>
            <CustomButton
              variant="contained"
              disabled={!active || claimable !== CLAIMABLE}
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