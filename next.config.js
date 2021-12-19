module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  env: {
    NETWORK: process.env.NETWORK,
    ELFNFT_ADDRESS: process.env.ELFNFT_ADDRESS,
    INFURA_ID: process.env.INFURA_ID,
  }
}
