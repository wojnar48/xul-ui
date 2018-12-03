const withCSS = require('@zeit/next-css')

// Configure Next.js to use CSS modules.
// See: https://nextjs.org/docs/#importing-css--sass--less--stylus-files.
module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
});
