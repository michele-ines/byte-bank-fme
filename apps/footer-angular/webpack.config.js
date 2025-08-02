const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container: { ModuleFederationPlugin } } = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/shared/define-footer.ts",
  mode: "development",

  devServer: {
    port: 4200,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    static: { directory: path.resolve(__dirname, "public") },
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "auto",
  },

  resolve: {
    extensions: [
      ".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".scss", ".css", ".svg"
    ],
    plugins: [
      new TsconfigPathsPlugin({
        // tsconfig COMPARTILHADO na raiz do monorepo
        configFile: path.resolve(__dirname, "../../tsconfig.json"),
        extensions: [
          ".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css", ".scss", ".svg"
        ],
      }),
    ],
    alias: {
      "@store": path.resolve(__dirname, "../store"),
      "@global-styles": path.resolve(__dirname, "../../styles/globals.css"),
    },
  },

  ignoreWarnings: [
    { module: /sass-loader/, message: /legacy JS API is deprecated/ },
  ],

  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/i,
        loader: "ts-loader",
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },

      // SCSS global
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { url: true } },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: { silenceDeprecations: ["legacy-js-api"] },
            },
          },
        ],
      },

      // CSS puro
      {
        test: /\.css$/i,
        use: ["style-loader", { loader: "css-loader", options: { url: true } }, "postcss-loader"],
      },

      // SVG como asset (com hash)
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: { filename: "static/media/[name].[contenthash][ext]" },
      },

      // Imagens raster
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
        generator: { filename: "static/media/[name].[contenthash][ext]" },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "footer",
      filename: "remoteEntry.js",
      exposes: {
        "./define": "./src/shared/define-footer.ts",
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
