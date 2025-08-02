// C:\Users\Mines\Music\byte-bank-fme\apps\root\webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  container: { ModuleFederationPlugin },
} = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
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
        loader: "ts-loader",
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },
      { test: /\.css$/i, use: ["style-loader", "css-loader", "postcss-loader"] },
      {
        test: /\.s[ac]ss$/i,
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "root",
      filename: "remoteEntry.js",
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
        home: "home@http://localhost:3002/remoteEntry.js",
        dashboard: "dashboard@http://localhost:3003/remoteEntry.js",
        footer: "footer@http://localhost:4200/remoteEntry.js",
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
      process: "process/browser", // ← shim global para libs que usam process no client
    }),
  ],
};
