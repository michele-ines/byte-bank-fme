const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3002,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  output: {
    publicPath: "auto"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'] // ✅ Adiciona .scss
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
        test: /\.s[ac]ss$/i, // ✅ Sass e SCSS
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
       {
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
      type: 'asset/resource',
    },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      exposes: {
        "./Home": "./src/pages/Home.tsx",
        "./Cadastro": "./src/pages/cadastro/registerPage.tsx",
        "./Login": "./src/pages/login/loginPage.tsx",
        "./EsqueciSenha": "./src/pages/esqueci-senha/forgotPasswordPage.tsx",
        './not-found': './src/pages/not-found/notFound.tsx', 
      },
      remotes: {},
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
