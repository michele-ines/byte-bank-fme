// byte‑bank‑fme/apps/dashboard-react/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3003,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: { directory: path.resolve(__dirname, 'public') },
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    alias: {
      '@ui-imgs': path.resolve(__dirname, '../components/ui/imgs'),
      '@my-cards': path.resolve(__dirname, '../components/my-cards'),
    },
  },
  module: {
    rules: [
      // 1) CSS‑Modules para *.module.scss
      {
        test: /\.module\.s[ac]ss$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../components/my-cards'),
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // postcss + sass
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
              url: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              // ↓ silencia apenas o aviso de legacy JS API
              sassOptions: {
                silenceDeprecations: ['legacy-js-api']
              }
            },
          },
        ],
      },

      // 2) SCSS global (não‑modules)
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: true } },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                silenceDeprecations: ['legacy-js-api']
              }
            },
          },
        ],
      },

      // 3) SVGs como assets
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: { filename: 'static/media/[name][ext]' },
      },

      // 4) TypeScript
      {
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },

      // 5) CSS puro
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: true } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './Dashboard': './src/pages/dashboard/Dashboard.tsx',
        './MeusCartoes': './src/pages/meus-cartoes/MeusCartoes.tsx',
        './Investimentos': './src/pages/investimentos/Investimentos.tsx',
        './OutrosServicos': './src/pages/outros-servicos/OutrosServicos.tsx',
        './MinhaConta': './src/pages/minha-conta/MinhaConta.tsx',
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: '^17.0.2' },
        'react-dom': { singleton: true, eager: false, requiredVersion: '^17.0.2' },
        'react-router-dom': { singleton: true, eager: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
