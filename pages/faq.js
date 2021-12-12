
import { useTranslations } from 'next-intl';
import Navigation from '../components/Navigation';
import styled from 'styled-components';

export default function FAQ() {
  const t = useTranslations('faq');

  return (
    <main>
      <Navigation />
      <h1 className="masthead">
        {t.rich('title')}
      </h1>
      <div className="read">
        <h2 className="subheading">
          {t.rich('general')}
        </h2>
        <h3 className="faq-question">
          {t.rich('inCharge')}
        </h3>
        <p className="faq-response">
          {t.rich('inChargeResponse')}
        </p>
        <h3 className="faq-question">
          {t.rich('howProposal')}
        </h3>
        <p className="faq-response">
          {t.rich('howProposalResponse')}
        </p>
        {/* TODO: add response */}
        {/* <h3 className="faq-question">
          {t.rich('donationsLocked')}
        </h3>
        <p className="faq-response">
          {t.rich('donationsLockedResponse')}
        </p> */}
        <h3 className="faq-question">
          {t.rich('whyJuicebox')}
        </h3>
        <p className="faq-response">
          {t.rich('whyJuiceboxResponse',
          {link: (children) => <a className="link" href="https://juicebox.money/#/" target="_blank" rel="noreferrer">{children}</a>})}
        </p>
        <Spacer />
        <h2 className="subheading">
        {t.rich('legalStructural')}
        </h2>
        <h3 className="faq-question">
          {t.rich('whatLegal')}
        </h3>
        <p className="faq-response">
          {t.rich('whatLegalResponse', {
            link: (children) => <a className="link" href="https://endaoment.org/" target="_blank" rel="noreferrer">{children}</a>
          })}
        </p>
        <h3 className="faq-question">
          {t.rich('ownLegal')}
        </h3>
        <p className="faq-response">
          {t.rich('ownLegalResponse', {
            link: (children) => <a className="link" href="https://endaoment.org/" target="_blank" rel="noreferrer">{children}</a>
          })}
        </p>
      </div>
    </ main>
  );
}

const Spacer = styled.div`
  height: 2rem;
`;


export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
