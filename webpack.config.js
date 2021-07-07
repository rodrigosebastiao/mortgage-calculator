// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: {
        mortigage: ['./src/js/mortgage.js', './src/scss/mortgage.scss'],
      },
      output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'dist'),
      },
  optimization: {
    mergeDuplicateChunks: true,
  },
  devServer: {
    open: true,
    host: "localhost",
    liveReload: true,
    port: 3001
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new HtmlWebpackPlugin({ template: './src/html/index.html', inject: 'body'}),
    new MiniCssExtractPlugin({
        filename: './css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
            "postcss-loader", 
            MiniCssExtractPlugin.loader,
            "css-loader", 
            "sass-loader"
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "fonts"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: "url-loader",
        options: { limit: 1000, name: "fonts/[name].[ext]", },
      },
      

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
