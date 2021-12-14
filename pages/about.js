import { useTranslations } from 'next-intl';
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
          {t.rich('about.remember', {
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
            link: (children) => <a className="link" href="https://endaoment.org/" target="_blank" rel="noreferrer">{children}</a>,
          })}
        </p>
        <h3 className="headline" style={{textAlign: 'center'}}>
          {t.rich('about.theAntaToken')}
        </h3>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.aboutAnta', {
            link: (children) => <a className="link" href="https://endaoment.org/" target="_blank" rel="noreferrer">{children}</a>,
          })}
        </p>
        {/* TODO: add info about elfdao nfts */}
        {/* <h3 className="headline" style={{textAlign: 'center'}}>
          {t.rich('about.elfDaoNFTs')}
        </h3>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.aboutElfDaoNFTs', {
            link: (children) => <a className="link" href="https://endaoment.org/" target="_blank" rel="noreferrer">{children}</a>,
          })}
        </p> */}
        <h2 className="subheading" style={{marginTop: '2rem'}}>
          {t.rich('about.whereFunds')}
        </h2>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.shortAnswer', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.longAnswer', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <ol className="manifesto" style={{marginBottom: '2rem'}}>
          <li className="manifesto">
            {t.rich('about.longAnswerOption1', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
          <li className="manifesto">
            {t.rich('about.longAnswerOption2', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
        </ol>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.community', {
            strong: (children) => <strong>{children}</strong>,
          })}
        </p>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('about.targetGoal', {
            strong: (children) => <strong>{children}</strong>,
            link: (children) => <a className="link" href="https://docs.endaoment.org/governance/mission-values#organization-funding-policy" target="_blank" rel="noreferrer">{children}</a>,
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
              link: (children) => <a className="link" href="https://join.elfdao.com/" target="_blank" rel="noreferrer">{children}</a>,
            })}
          </li>
          <li className="manifesto">
            {t.rich('about.spreadTheWord', {
              strong: (children) => <strong>{children}</strong>,
            })}
          </li>
        </ul>
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