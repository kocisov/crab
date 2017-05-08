module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.js'
  ],
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    publicPath: '/',
    compress: true
  }
}
