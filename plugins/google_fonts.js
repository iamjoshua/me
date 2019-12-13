module.exports = {
  resolve: `gatsby-plugin-prefetch-google-fonts`,
  options: {
    fonts: [
      {
        // https://fonts.google.com/specimen/Montserrat?selection.family=Montserrat
        family: `Montserrat`,
        variants: [
          '400',
          '400i',
          '500',
          '700',
          '700i'
        ],
      },
      {
        family: `Open Sans`,
        variants: [`400`, `700`]
      },
    ],
  },
}