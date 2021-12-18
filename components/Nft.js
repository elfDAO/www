import Image from 'next/image';
import Link from 'next/link';
import useTranslations from 'next-intl/useTranslations';

export default function Nft() {
    return (
        <div
        className="card-container" 
        style={{
          display: "grid",
          gap: "1em",
          gridTemplateColumns: "1fr 1fr 1fr",

          // for aligning center to page (you may have template already)
          width: "1000px",
          margin: "0 auto",
        }}>
          <div
            className="card"
            style={{
              boxSizing: "border-box",
              padding: "1.25em",
              borderRadius: "5px",
              background: "linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(0,0,0,0))",
              backdropFilter: "blur(2px)"
            }}>
              <img style={{
                borderRadius: "5px",
                width: "100%",

                 // image src should be already 1:1 aspect ratio
                height: "280px", 
                background: "#EEEEEE"
              }} alt="pic" />
              <div style={{
                paddingTop:"1.25em"
              }}>REINDEER</div>
              <div>{`>`}0.1 ETH</div>
              <div
                style={{
                  background: "#243E32",
                  color: "#36ECAC",
                  padding: "0.25em 0.5em",
                  display: "table",
                  marginTop: "1em",
                  borderRadius: "5px"
                }}>
                MINT
              </div>
          </div> 
      </div>
    )
}