const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  watch: true,
  entry: {
    popup: "./src/popup/popup.tsx",
    content: "./src/content/content.ts",
    background: "./src/background.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/icons", to: "icons" },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "src/popup/popup.html",
      chunks: ["popup"],
      inject: "body",
    }),
  ],
};
