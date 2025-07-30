const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container: { ModuleFederationPlugin } } = require('webpack');

module.exports = {
  // Entrada principal do microfrontend
  entry: './src/shared/define-footer.ts',
  mode: 'development',

  // Configurações do servidor de desenvolvimento
  devServer: {
    port: 4200,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  // Saída e publicPath automático (recomendado para MFEs)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'auto'
  },

  // Adiciona suporte à extensão .scss
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },

  // Ignora warnings do sass-loader legacy
  ignoreWarnings: [
    {
      module: /sass-loader/,
      message: /legacy JS API is deprecated/
    }
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader', // adicionado postcss para compatibilidade com Tailwind, autoprefixer etc.
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { quietDeps: true }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'footer',
      filename: 'remoteEntry.js',
      exposes: {
        './define': './src/shared/define-footer.ts'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
