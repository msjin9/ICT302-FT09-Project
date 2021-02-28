const path = require('path');
const { merge } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const common = require('./webpack.common.js');

const developmentWebpackConfig = {
  mode: 'development',
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '"dist"',
      },
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
  },
};

module.exports = merge(common, developmentWebpackConfig);
