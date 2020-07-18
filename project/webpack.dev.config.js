const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const path = require("path")
module.exports = {
  watch: true,
  entry: ['./src/ts/index.ts', './src/scss/style.scss'],
  output: {
    path: path.resolve(__dirname, '../')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../')
  },
  devServer: {
    contentBase: path.join(__dirname, '../'),
    compress: true
  },
  module: {
    rules: [
      // Extracts the compiled CSS from the SASS files defined in the entry
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Interprets CSS
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader' // 将 Sass 编译成 CSS
          }
        ]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      //Imagenes scss
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]',
        },
      }
    ],
  },
  plugins: [
    // Where the compiled SASS is saved to
    new MiniCssExtractPlugin({
      filename: 'index.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: 'index.html' },
      { from: './src/img', to: 'img' },
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })

  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
    ],
  },
};