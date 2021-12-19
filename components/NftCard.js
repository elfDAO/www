import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Nft(props) {
  const t = useTranslations('nft');
  const { name, value, image, claimable } = props;

  return (
    <div
      className="card"
      style={{
        boxSizing: "border-box",
        padding: "1.25em",
        borderRadius: "5px",
        background: "rgba(130, 255, 172, 0.5)",
        backdropFilter: "blur(2px)"
      }}>
        <Grid container spacing={1} direction="column">
          <Grid item>
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
            {!claimable && <h5 style={{color: '#A8EAB6', paddingTop: '0.5rem'}}>{t('notEligible')}</h5>}
            {claimable && <h5 style={{color: '#A8EAB6', paddingTop: '0.5rem'}}>{t('readyToClaim')}</h5>}

          </Grid>
          <Grid item>
            <Button
              style={{
                backgroundColor: '#A7EAB6 !important'
              }}
              variant="contained"
              color="primary"
              disabled={!claimable}
              disableElevation
            >
              {t('mint').toUpperCase()}
            </Button>
          </Grid>
        </Grid>
    </div>
  )
}