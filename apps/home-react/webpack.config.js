const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container: { ModuleFederationPlugin } } = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// → Declarar antes de usar no alias:
const privateThemingPath = path.dirname(
  require.resolve("@mui/private-theming/package.json")
);

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",

  devServer: {
    port: 3002,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    static: { directory: path.resolve(__dirname, "public") },
  },

  output: { publicPath: "auto" },

  resolve: {
    extensions: [
      ".tsx", ".ts", ".js", ".jsx", ".mjs", ".json", ".scss", ".css", ".svg"
    ],
    plugins: [
      new TsconfigPathsPlugin({
        // usa o tsconfig COMPARTILHADO do monorepo
        configFile: path.resolve(__dirname, "../../tsconfig.json"),
        extensions: [
          ".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css", ".scss", ".svg"
        ],
      }),
    ],
    alias: {
      "@mui/private-theming": privateThemingPath,
      // ajuste se você tiver o pacote/dir de store compartilhado
      "@store": path.resolve(__dirname, "../store"),
      "@global-styles": path.resolve(__dirname, "../../styles/globals.css"),
      
    },
  },

  module: {
    rules: [
      // 1) CSS-Modules para *.module.scss
      {
        test: /\.module\.s[ac]ss$/i,
        include: [
          path.resolve(__dirname, "src"),
          // inclua a pasta compartilhada se usar componentes lá
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

      // 2) SCSS global (não-modules)
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

      // 3) SVGs como assets com hash
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: { filename: "static/media/[name].[contenthash][ext]" },
      },

      // 4) Imagens raster
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
        generator: { filename: "static/media/[name].[contenthash][ext]" },
      },

      // 5) TypeScript
      {
        test: /\.tsx?$/i,
        loader: "ts-loader",
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },

      // 6) CSS puro
      {
        test: /\.css$/i,
        use: ["style-loader", { loader: "css-loader", options: { url: true } }, "postcss-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      exposes: {
        "./Home": "./src/pages/Home.tsx",
        "./Cadastro": "./src/pages/cadastro/registerPage.tsx",
        "./Login": "./src/pages/login/loginPage.tsx",
        "./EsqueciSenha": "./src/pages/esqueci-senha/forgotPasswordPage.tsx",
        "./not-found": "./src/pages/not-found/notFound.tsx",
      },
      remotes: {},
      shared: {
        react: { singleton: true, eager: false, requiredVersion: "^17.0.2" },
        "react-dom": { singleton: true, eager: false, requiredVersion: "^17.0.2" },
        "react/jsx-runtime": { singleton: true, eager: false, requiredVersion: "^17.0.2" },
        "react-router-dom": { singleton: true, eager: false },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
