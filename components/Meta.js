import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <title>elfDAO</title>
      <meta name="title" content="elfDAO" />
      <meta
        name="description"
        content="This holiday season, we elves at elfDAO are on a mission to get gifts to kids in need."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.elfDAO.com/" />
      <meta property="og:title" content="elfDAO" />
      <meta
        property="og:description"
        content="This holiday season, we elves at elfDAO are on a mission to get gifts to kids in need."
      />
      <meta property="og:image" content="/meta_image.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.elfDAO.com/" />
      <meta property="twitter:title" content="elfDAO" />
      <meta
        property="twitter:description"
        content="This holiday season, we elves at elfDAO are on a mission to get gifts to kids in need."
      />
      <meta
        property="twitter:image"
        content="https://www.elfDAO.com/meta_image.png"
      ></meta>
    </Head>
  );
};

export default Meta;
