import { useTranslations } from 'next-intl';
import FAQ from '../components/faq';
import Navigation from '../components/Navigation';

export default function About() {
  const t = useTranslations();

  return (
    <main>
      <Navigation />
      <h1 className="masthead">
        {t.rich('about.title', { br: () => <br />})}
      </h1>
      <article>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.manyKids', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.tools', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.12days', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto">
          {t.rich('about.joinElfDao', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <h2 className="subheading" style={{marginTop: '2rem'}}>
          {t.rich('about.whatSuccess')}
        </h2>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.oneIn10', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.weCare', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.goal', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <h2 className="subheading" style={{marginTop: '2rem'}}>
          {t.rich('about.howRaising')}
        </h2>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.raisingJuicebox', {
            link: (children) => <a className="link" href="https://juicebox.money/#/elfdao" target="_blank" rel="noreferrer">{children}</a>,
          })}
        </p>
        <h3 className="headline" style={{textAlign: 'center'}}>
          {t.rich('about.theGiftToken')}
        </h3>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.aboutGift', {
            link: (children) => <a className="link" href="https://juicebox.money/#/" target="_blank" rel="noreferrer">{children}</a>,
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.coreTeam', {
            link: (children) => <a className="link" href="" target="_blank" rel="noreferrer">{children}</a>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.burn')}
        </p>
        <h3 className="headline" style={{textAlign: 'center'}}>
          {t.rich('about.aboutNFT')}
        </h3>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.aboutElfDaoNFTs')}
        </p>
        <ol className="manifesto" style={{marginBottom: '2rem'}}>
          <li className="manifesto">
            {t.rich('about.tier1', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
          <li className="manifesto">
            {t.rich('about.tier2', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
          <li className="manifesto">
            {t.rich('about.tier3', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
        </ol>
        <p style={{marginBottom: '2rem'}}>
          <i>
            {t('about.note')}
          </i>
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.reserving')}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.claiming')}
        </p>
        <h2 className="subheading" style={{marginTop: '2rem'}}>
          {t.rich('about.whereFunds')}
        </h2>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.shortAnswer', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.governanceTokens', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.criteria', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <ul className="manifesto" style={{marginBottom: '2rem'}}>
          <li className="manifesto">
            {t.rich('about.registered', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
          <li className="manifesto">
            {t.rich('about.endaoment', {
              link: (children) => <a className="link" href="https://docs.endaoment.org/governance/mission-values#organization-funding-policy" target="_blank" rel="noreferrer">{children}</a>,
            })}
          </li>
          <li className="manifesto">
            {t.rich('about.aligned', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
        </ul>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.holders', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.reservedAmount', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.codified', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <h2 className="subheading" style={{marginTop: '2rem'}}>
          {t.rich('about.howContribute')}
        </h2>
        <ul className="manifesto" style={{marginBottom: '2rem'}}>
          <li className="manifesto">
            {t.rich('about.donate', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
          <li className="manifesto">
            {t.rich('about.contribute', {
              strong: (children) => <strong>{children}</strong>,
              link: (children) => <a className="link" href="https://discord.com/invite/elfdao" target="_blank" rel="noreferrer">{children}</a>,
            })}
          </li>
          <li className="manifesto">
            {t.rich('about.spreadTheWord', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
        </ul>
        <FAQ />
        <h2 className="subheading">
          . . .
        </h2>
        <p className="manifesto">
          More information in our comprehensive <a className="link" href="https://docs.elfdao.com/" target="_blank" rel="noreferrer">docs</a> site.
        </p>
      </article>
    </ main>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}