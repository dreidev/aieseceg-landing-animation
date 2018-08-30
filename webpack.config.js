const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = ({ mode }) => {
  return {
    mode,
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    entry: {
      index: './src/index.js'
      // another: './src/scenesIndex.js'
    },
    output: {
      filename: '[name].bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8081,
        openAnalyzer: true
      })
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
                removeComments: false,
                collapseWhitespace: false
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-url-loader'
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpg|ttf|woff|woff2|eot)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.ttf$/,
          use: [
            {
              loader: 'ttf-loader',
              options: {
                name: './font/[hash].[ext]'
              }
            }
          ]
        }
      ]
    }
  };
};
