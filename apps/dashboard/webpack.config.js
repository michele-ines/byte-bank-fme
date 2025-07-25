const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3003,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  output: {
    publicPath: "auto"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        "./Dashboard": "./src/pages/Dashboard.tsx",
        "./MeusCartoes": "./src/pages/MeusCartoes.tsx",
        "./Investimentos": "./src/pages/Investimentos.tsx",
        "./OutrosServicos": "./src/pages/OutrosServicos.tsx",
        "./MinhaConta": "./src/pages/MinhaConta.tsx"
      },
      remotes: {

      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: '^17.0.2' },
        'react-dom': { singleton: true, eager: false, requiredVersion: '^17.0.2' },
        'react-router-dom': { singleton: true, eager: false }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
