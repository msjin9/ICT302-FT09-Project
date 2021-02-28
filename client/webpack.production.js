const { mergeWithCustomize, customizeObject } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

const productionWebpackConfig = {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BASE_URL: '"dist"',
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
  ],
};

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    entry: 'prepend',
  }),
})(common, productionWebpackConfig);
