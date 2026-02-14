const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    port: 4000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        products: 'products@http://localhost:3001/remoteEntry.js',
        cart: 'cart@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: false,
          requiredVersion: '^18.3.1',
        },
        'react-dom': {
          singleton: true,
          eager: false,
          requiredVersion: '^18.3.1',
        },
        'react-router-dom': {
          singleton: true,
          eager: false,
          requiredVersion: '^6.20.1',
        },
        vue: {
          singleton: true,
          eager: false,
          requiredVersion: '^3.5.28',
        },
        pinia: {
          singleton: true,
          eager: false,
          requiredVersion: '^2.1.7',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};