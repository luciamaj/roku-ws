module.exports = {
    entry: './index.js',
    output: {
      publicPath: './',
      filename: 'bundle.js',
      path: __dirname
    },
  
    target: 'node',
  
    resolve: {
      extensions: ['.js']
    },
    externals: {
      '@brightsign/screenshot': 'commonjs @brightsign/screenshot',
    },
    module: {
      rules: [{}]
    }
};  