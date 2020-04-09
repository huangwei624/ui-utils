const webpack = require("webpack");

module.exports = {
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
      ],
    },
    publicPath: "./",
    chainWebpack: config => {
      config.plugin("html").tap(args => {
        args[0].minify = false;
        return args;
      });
    },
  }