const path = require("path");
const colors = require("colors");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html templates
const OptimizeJsPlugin = require("optimize-js-plugin"); // wrapping js into iife, for better performacje
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extract css files into separate files. css file per js file, help with source maps
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // it uses cssnano to optimize css output
const TerserPlugin = require("terser-webpack-plugin"); // minify js files
const WebpackMd5Hash = require("webpack-md5-hash"); // used instead of traditional hashes

const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
    filename: "index.html",
    inject: "body",
    inject: false
  })
];

const pluginsProduction = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html",
    //inject: "body",
    inject: false,
    hash: true,
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new OptimizeCssAssetsPlugin({}),
  new OptimizeJsPlugin({
    sourceMap: false
  }),
  new MiniCssExtractPlugin({
    filename: "main.[contenthash].css"
  }),
  new WebpackMd5Hash()
];

module.exports = env => {
  const environment = env || "production";

  console.log(
    ("You are in _".black + environment.red.bold + "_ environment".black)
      .bgWhite
  );

  if (environment === "production") {
    return {
      mode: environment,
      entry: "./src/index.js",
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.[chunkhash].js"
      },
      optimization: {
        minimizer: [
          new OptimizeCssAssetsPlugin(),
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {},
              mangle: true, // Note `mangle.properties` is `false` by default.
              module: false,
              output: null,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_classnames: undefined,
              keep_fnames: false,
              safari10: true
            }
          }),
        ]
      },
      watch: false,
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "postcss-loader"]
          },
          {
            test: /\.css$/,
            //include: /node_modules/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  url: false
                }
              },
              "postcss-loader"
            ]
          },
          {
            test: /\.js$/,
            use: [
              {
                loader: "babel-loader"
              }
            ]
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
        filename: "index.[hash].js"
      },
      watch: true,
      module: {
        rules: [
          {
            test: /\.js$/,
            use: "babel-loader",
            exclude: /node_modules/
          },
          {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  url: false
                }
              },
              "postcss-loader"
            ]
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
