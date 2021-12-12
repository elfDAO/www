import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <title>ElfDAO</title>
      <meta name="title" content="ElfDAO" />
      <meta
        name="description"
        content="Here at elfDAO, we are elves - the workers, builders, and contributors of holiday cheer. That's why we've created elfDAO - to fund, organize, and donate gifts to institutions, orphanages, and low-income neighborhood centers and bring holiday joy to as many children as possible."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.elfdao.com/" />
      <meta property="og:title" content="ElfDAO" />
      <meta
        property="og:description"
        content="Here at elfDAO, we are elves - the workers, builders, and contributors of holiday cheer. That's why we've created elfDAO - to fund, organize, and donate gifts to institutions, orphanages, and low-income neighborhood centers and bring holiday joy to as many children as possible."
      />
      <meta property="og:image" content="/meta_image.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.elfdao.com/" />
      <meta property="twitter:title" content="ElfDAO" />
      <meta
        property="twitter:description"
        content="Here at elfDAO, we are elves - the workers, builders, and contributors of holiday cheer. That's why we've created elfDAO - to fund, organize, and donate gifts to institutions, orphanages, and low-income neighborhood centers and bring holiday joy to as many children as possible."
      />
      <meta
        property="twitter:image"
        content="https://www.elfdao.com/meta_image.png"
      ></meta>
    </Head>
  );
};

export default Meta;
