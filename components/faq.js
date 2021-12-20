import { useTranslations } from 'next-intl';
import styled from 'styled-components';

export default function FAQ() {
  const t = useTranslations('faq');

  return (
    <>
      <h2 className="subheading">
        {t.rich('general')}
      </h2>
      <h3 className="headline">
        {t.rich('inCharge')}
      </h3>
      <p className="faq-response">
        {t.rich('inChargeResponse')}
      </p>
      <h3 className="headline">
        {t.rich('howProposal')}
      </h3>
      <p className="faq-response">
        {t.rich('howProposalResponse', {
          link: (children) => <a className="link" href="https://snapshot.org/#/" target="_blank" rel="noreferrer">{children}</a>,
        })}
      </p>
      <h3 className="headline">
        {t.rich('whoSnapshot')}
      </h3>
      <p className="faq-response">
        {t.rich('whoSnapshotResponse')}
      </p>
      <h3 className="headline">
        {t.rich('whyJuicebox')}
      </h3>
      <p className="faq-response">
        {t.rich('whyJuiceboxResponse',
        {link: (children) => <a className="link" href="https://juicebox.money/#/" target="_blank" rel="noreferrer">{children}</a>})}
      </p>
      <h3 className="headline">
        {t.rich('whoHandling')}
      </h3>
      <p className="faq-response">
        {t.rich('whoHandlingResponse', {
          link: (children) => <a className="link" href="https://etherscan.io/address/0xeb846e297c6f34337e2a6a65136ff8f29d48dd3a" target="_blank" rel="noreferrer">{children}</a>,
        })}
      </p>
      <Spacer />
      <h2 className="subheading">
      {t.rich('legalStructural')}
      </h2>
      <h3 className="headline">
        {t.rich('whatLegal')}
      </h3>
      <p className="faq-response">
        {t.rich('whatLegalResponse', {
          link: (children) => <a className="link" href="https://endaoment.org/" target="_blank" rel="noreferrer">{children}</a>
        })}
      </p>
      <h3 className="headline">
        {t.rich('taxDeductible')}
      </h3>
      <p className="faq-response">
        {t.rich('taxDeductibleResponse', {
          endaoment: (children) => <a className="link" href="https://endaoment.org/" target="_blank" rel="noreferrer">{children}</a>,
          discord: (children) => <a className="link" href="https://discord.com/invite/endaoment" target="_blank" rel="noreferrer">{children}</a>,
          email: (children) => <a className="link" href="mailto:admin+elfdao@endaoment.org" target="_blank" rel="noreferrer">{children}</a>
        })}
      </p>
      <h3 className="headline">
        {t.rich('whyNotCrowdfund')}
      </h3>
      <p className="faq-response">
        {t.rich('whyNotCrowdfundResponse')}
      </p>
      <Spacer />
      <h2 className="subheading">
      {t.rich('juicebox')}
      </h2>
      <h3 className="headline">
        {t.rich('whyJuicebox')}
      </h3>
      <p className="faq-response">
        {t.rich('whyJuiceboxResponse',
        {link: (children) => <a className="link" href="https://juicebox.money/#/" target="_blank" rel="noreferrer">{children}</a>})}
      </p>
      <h3 className="headline">
        {t.rich('giftValue')}
      </h3>
      <p className="faq-response">
        {t.rich('giftValueResponse',
        {strong: (children) => <strong>{children}</strong>})}
      </p>
    </>
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
