const webpack = require("webpack");

module.exports = {
    module: {
      rules: [
        {
          test: /\.txt$/i,
          use: 'raw-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
          'process.env.NODE_ENV' : JSON.stringify('production')
      })
  ]
  };