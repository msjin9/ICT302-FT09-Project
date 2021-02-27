const { mergeWithCustomize, customizeObject } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const productionWebpackConfig = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }),
      new HtmlWebpackPlugin({
        title: 'client',
        templateParameters: (compilation, assets, pluginOptions) => {
          // enhance html-webpack-plugin's built in template params
          let stats;
          return Object.assign(
            {
              // make stats lazy as it is expensive
              get webpack() {
                return stats || (stats = compilation.getStats().toJson());
              },
              compilation: compilation,
              webpackConfig: compilation.options,
              htmlWebpackPlugin: {
                files: assets,
                options: pluginOptions
              }
            },
            resolveClientEnv(options, true /* raw */)
          );
        },
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        template: 'public/index.html'
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: [function() {}],
        use: [
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        },
        parallel: true,
        extractComments: false
      })
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BASE_URL: '"/"'
      }
    })
  ]
};

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    entry: 'prepend'
  })
})(common, productionWebpackConfig);
