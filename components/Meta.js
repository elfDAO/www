import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <title>ElfDAO</title>
      <meta name="title" content="ElfDAO" />
      <meta
        name="description"
        content="Next week, a privately-owned copy of the Constitution will be auctioned. We're buying it and repatriating it to its rightful owner: the people."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.elfdao.com/" />
      <meta property="og:title" content="ElfDAO" />
      <meta
        property="og:description"
        content="Next week, a privately-owned copy of the Constitution will be auctioned. We're buying it and repatriating it to its rightful owner: the people."
      />
      <meta property="og:image" content="/meta_image.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.elfdao.com/" />
      <meta property="twitter:title" content="ElfDAO" />
      <meta
        property="twitter:description"
        content="Next week, a privately-owned copy of the Constitution will be auctioned. We're buying it and repatriating it to its rightful owner: the people."
      />
      <meta
        property="twitter:image"
        content="https://www.elfdao.com/meta_image.png"
      ></meta>
    </Head>
  );
};

export default Meta;
