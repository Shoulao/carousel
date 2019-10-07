const path = require("path");
const colors = require("colors");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeJsPlugin = require("optimize-js-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
    filename: "index.html",
    inject: "body"
  }),
];

const pluginsProduction = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
    filename: "index.html",
    inject: "body",
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true
    }
  }),
  new OptimizeJsPlugin({
    sourceMap: false
  }),
  new MiniCssExtractPlugin({})
];

module.exports = env => {
  const environment = env || "production";

  console.log(
    ("You are in _".black +  environment.red.bold + "_ environment".black)
      .bgWhite
  );

  if (environment === "production") {
    return {
      mode: environment,
      entry: "./src/index.js",
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.bundle.js"
      },
      optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            //include: /node_modules/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.js$/,
            use: "babel-loader"
          },
          {
            test: /\.(jpe?g|png|gif|svg|pdf)$/,
            exclude: /node_modules/,
            loader: "file-loader?name=images/[name].[ext]"
          }
        ]
      },
      plugins: pluginsProduction
    };
  }

  if (environment === "development") {
    return {
      mode: environment,
      entry: "./src/index.js",
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.bundle.js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: "babel-loader"
          },
          {
            test: /\.css$/,
            // include: /node_modules/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(jpe?g|png|gif|svg|pdf)$/,
            exclude: /node_modules/,
            loader: "file-loader?name=images/[name].[ext]"
          }
        ]
      },
      plugins
    };
  }
};
