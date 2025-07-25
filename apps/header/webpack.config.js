const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  output: { publicPath: 'auto' },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    alias: {
      'react/jsx-runtime': require.resolve('react/jsx-runtime')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
          
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'header',
      filename: 'remoteEntry.js',
      exposes: {
        './HeaderPublic': './src/shared/HeaderPublic.tsx',
        './HeaderPrivate': './src/shared/HeaderPrivate.tsx'
      },
      remotes: {},
      shared: {
        react:             { singleton: true, requiredVersion: '^17.0.2' },
        'react-dom':       { singleton: true, requiredVersion: '^17.0.2' },
        'react-router-dom':{ singleton: true }
      }
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};
