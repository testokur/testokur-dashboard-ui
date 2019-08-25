const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const config = {
  mode: dev ? 'development' : 'production',
  entry: {
    index: './src/index.tsx',
    silentRenew: './src/silentRenew.ts',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: dev ? '[name].[hash].js' : '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png|ico|xml|json)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TestOkur Dasbhoard',
      chunks: ['index'],
      template: 'public/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['silentRenew'],
      filename: 'silentRenew.html',
      template: 'public/silentRenew.html'
    }),
    new CopyPlugin([{ from: 'assets/favicons', to: 'assets/favicons' }]),
  ],
};

if (dev) {
  config.devServer = {
    port: 8080, // https://webpack.js.org/configuration/dev-server/#devserverport
    open: true, // https://webpack.js.org/configuration/dev-server/#devserveropen
    hot: true, // https://webpack.js.org/configuration/dev-server/#devserverhot
    compress: true, // https://webpack.js.org/configuration/dev-server/#devservercompress
    stats: 'errors-only', // https://webpack.js.org/configuration/dev-server/#devserverstats-
    overlay: true, // https://webpack.js.org/configuration/dev-server/#devserveroverlay,
    historyApiFallback: true,
  };
} else {
  config.optimization = {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  };
}

module.exports = config;
