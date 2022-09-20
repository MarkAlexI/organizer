const path = require("path");
const webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => ({
  mode: env.prod ? "production" : "development",
  entry: [
    path.resolve(__dirname, "./src/main.js")
  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: "@vue/runtime-dom",
      '@': path.resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  stats: {
    errorDetails: true,
  },
});
