import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@material-ui/core';

export default function Nft(props) {
  const t = useTranslations('nft');
  const { name, value, image } = props;

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
        <Image
          style={{
            borderRadius: "5px",
          }}
          alt="nft image"
          src={image}
          width={300}
          height={300}
        />
        <div style={{
          paddingTop:"1.25em"
        }}>
          <h3 style={{color: 'white'}}>{name.toUpperCase()}</h3>
        </div>
        <h3 style={{color: '#A8EAB6', paddingTop: '0.5rem'}}>{value}</h3>
        <Button
          style={{
            background: "#A7EAB6",
            color: "#10392A",
            padding: "0.25em 0.5em",
            display: "table",
            marginTop: "1em",
            borderRadius: "5px"
          }}>
          {t('mint').toUpperCase()}
        </Button>
    </div>
  )
}