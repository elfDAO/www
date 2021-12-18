import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Nft(props) {
  const t = useTranslations('nft');
  const { name, value } = props;

  return (
    <div
      className="card"
      style={{
        boxSizing: "border-box",
        padding: "1.25em",
        borderRadius: "5px",
        background: "linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(0,0,0,0))",
        backdropFilter: "blur(2px)"
      }}>
        <Image
          style={{
            borderRadius: "5px",
            width: "100%",
            height: "280px",
            background: "#EEEEEE"
          }}
          alt="nft image"
          src={'/src/gift.png'}
          width={300}
          height={300}
        />
        <div style={{
          paddingTop:"1.25em"
        }}>{name}</div>
        <div>{value} {t('eth').toUpperCase()}</div>
        <div
          style={{
            background: "#243E32",
            color: "#36ECAC",
            padding: "0.25em 0.5em",
            display: "table",
            marginTop: "1em",
            borderRadius: "5px"
          }}>
          {t('mint').toUpperCase()}
        </div>
    </div>
  )
}