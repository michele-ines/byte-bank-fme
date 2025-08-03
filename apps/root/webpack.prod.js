const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  mode: 'production',
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@store": path.resolve(__dirname, "../store"),
      "@global-styles": path.resolve(__dirname, "../../styles/globals.css"),
    },
    fallback: {
      process: require.resolve("process/browser"), // ← shim
    },
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
      name: 'root',
      filename: 'remoteEntry.js',
      exposes: {

      },
      remotes: {
        "header": "header@/header/remoteEntry.js",
        "home": "home@/home/remoteEntry.js", 
        "dashboard": "dashboard@/dashboard/remoteEntry.js",
        "footer": "footer@/footer/remoteEntry.js"
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