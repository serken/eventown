module.exports = {
  test: /\.sass$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
        },
      },
      'postcss-loader',
      'sass-loader'
    ]
  })
}
