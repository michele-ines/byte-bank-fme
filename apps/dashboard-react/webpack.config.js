// C:\Users\Mines\Music\byte-bank-fme\apps\dashboard-react\webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3003,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    static: { directory: path.resolve(__dirname, "public") },
  },
  output: { publicPath: "auto" },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".mjs", ".json", ".scss", ".css", ".svg"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../../tsconfig.json"),
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css", ".scss", ".svg"],
      }),
    ],
    alias: {
      "@store": path.resolve(__dirname, "../store"),
    },
    fallback: {
      process: require.resolve("process/browser"), // ← shim
    },
  },
  module: {
    rules: [
      {
        test: /\.module\.s[ac]ss$/i,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "../components/my-cards"),
        ],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: { localIdentName: "[name]__[local]__[hash:base64:5]" },
              url: true,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: { silenceDeprecations: ["legacy-js-api"] },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { url: true } },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: { silenceDeprecations: ["legacy-js-api"] },
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: { filename: "static/media/[name].[contenthash][ext]" },
      },
      {
        test: /\.tsx?$/i,
        loader: "ts-loader",
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", { loader: "css-loader", options: { url: true } }, "postcss-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/pages/dashboard/Dashboard.tsx",
        "./MeusCartoes": "./src/pages/meus-cartoes/MeusCartoes.tsx",
        "./Investimentos": "./src/pages/investimentos/Investimentos.tsx",
        "./OutrosServicos": "./src/pages/outros-servicos/OutrosServicos.tsx",
        "./MinhaConta": "./src/pages/minha-conta/MinhaConta.tsx",
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, eager: false, requiredVersion: "^18.2.0" },
        "react/jsx-runtime": { singleton: true, eager: false, requiredVersion: "^18.2.0" },
        "react-router-dom": { singleton: true, eager: false },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new webpack.ProvidePlugin({
      process: "process/browser", // ← shim
    }),
  ],
};
