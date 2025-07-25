// apps/footer-angular/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container: { ModuleFederationPlugin } } = require('webpack');

module.exports = {
  // agora aponta para o arquivo em src/shared
  entry: './src/shared/define-footer.ts',
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
              implementation: require('sass'),
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
        // também ajustado para src/shared
        './define': './src/shared/define-footer.ts'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
