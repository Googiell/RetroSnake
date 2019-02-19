module.exports = {
   entry: './src/js/game.js',
   output: {
      filename: 'bundle.js',
      path: `${__dirname}/dist/js`,
   },
   watch: true,
   mode: "development", //ta opcja zostanie pominięta jeżeli użyjemy npm run build
   devtool: "source-map",
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