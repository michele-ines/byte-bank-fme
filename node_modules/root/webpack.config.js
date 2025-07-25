const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3000,
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
      name: 'root',
      filename: 'remoteEntry.js',
      exposes: {

      },
      remotes: {
        "header": "header@http://localhost:3001/remoteEntry.js",
        "home": "home@http://localhost:3002/remoteEntry.js",
        "dashboard": "dashboard@http://localhost:3003/remoteEntry.js",
        "footer": "footer@http://localhost:4200/remoteEntry.js"
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
