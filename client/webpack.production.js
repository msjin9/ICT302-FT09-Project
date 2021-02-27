const { merge } = require('webpack-merge');
const {
  DefinePlugin,
  HashedModuleIdsPlugin,
  NamedChunksPlugin
} = require('webpack');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: [function() {}],
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: 'node_modules/.cache/babel-loader',
              cacheIdentifier: 'a135553c'
            }
          },
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
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BASE_URL: '"/"'
      }
    }),
    new FriendlyErrorsWebpackPlugin({
      additionalTransformers: [function() {}],
      additionalFormatters: [function() {}]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new OptimizeCssnanoPlugin({
      sourceMap: false,
      cssnanoOptions: {
        preset: [
          'default',
          {
            mergeLonghand: false,
            cssDeclarationSorter: false
          }
        ]
      }
    }),
    new HashedModuleIdsPlugin({
      hashDigest: 'hex'
    }),
    new NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }

      const hash = require('hash-sum');
      const joinedHash = hash(
        Array.from(chunk.modulesIterable, m => m.id).join('_')
      );
      return `chunk-` + joinedHash;
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
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      },
      template: 'public/index.html'
    })
  ]
});
