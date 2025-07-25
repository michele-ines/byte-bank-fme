// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container: { ModuleFederationPlugin } } = require('webpack');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',

  // Faz o dev-server rodar em localhost:4200
  devServer: {
    port: 4200,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  // Pasta de saída e publicPath automático para microfrontends
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'auto'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  // Aqui dizemos ao Webpack para silenciar especificamente esse warning
  ignoreWarnings: [
    {
      // qualquer módulo que venha do sass‑loader…
      module: /sass-loader/,
      // …com a mensagem “legacy JS API is deprecated”
      message: /legacy JS API is deprecated/
    }
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // garante que use Dart Sass
              implementation: require('sass'),
              // suprime warnings de dependências
              sassOptions: {
                quietDeps: true
              }
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
        './define': './src/define-footer.ts'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
