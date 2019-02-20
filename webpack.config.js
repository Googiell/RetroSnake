const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
   entry: './src/js/game.js',
   output: {
      filename: 'bundle.js',
      path: `${__dirname}/dist/js`,
   },
   watch: true,
   mode: 'production',
   devtool: "source-map",
   plugins: [
      new BundleAnalyzerPlugin()

   ],
   module: {
      rules: [{
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
            loader: 'babel-loader',
            options: {
               presets: [
                  ["env", {
                     targets: {
                        browsers: ['> 1%']
                     }
                  }]
               ]
            }
         }
      }]
   }
}