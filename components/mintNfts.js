import { Grid } from "@mui/material";
import Nft from "./subcomponents/NftCard";
import { useTranslations } from 'next-intl';

export default function MintNFTs() {
  const t = useTranslations('nft');

  return (
    <Grid container width="100%" spacing={{xs: 0, sm: 2}} direction={{xs: 'column', sm: 'row'}} justifyContent="center">
      <Grid item>
        <Nft
          name={t('elf')}
          value={'Contributions > 0.1 ETH'}
          image={'/elf.svg'}
          claimable={true}
        />
      </Grid>
      <Grid item>
        <Nft
          name={t('reindeer')}
          value={'Contributions > 0.5 ETH'}
          image={'/reindeer.svg'}
          claimable={false}
        />
      </Grid>
      <Grid item>
        <Nft
          name={t('santa')}
          value={'Top 5 Contributers'}
          image={'/santa.svg'}
          claimable={false}
        />
      </Grid>
    </Grid>
  )
}