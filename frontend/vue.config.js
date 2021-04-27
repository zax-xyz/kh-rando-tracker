const webpack = require("webpack");
const path = require("path");

module.exports = {
  pages: {
    index: {
      entry: "src/main.ts",
      title: "KH Item Tracker",
    },
  },
  css: {
    loaderOptions: {
      css: {
        url: false,
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: "pug-plain-loader",
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            import: [path.resolve(__dirname, "./src/assets/stylus/colors.styl")],
          },
        },
      }),
      new webpack.DefinePlugin({
        "process.env": {
          PACKAGE_VER: `"${require("./package.json").version}"`,
        },
      }),
    ],
  },
};
