const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

// config common to all entry points
const commonConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/,
        loader: 'typings-for-css-modules-loader?modules&namedExport&camelCase' // allow typescript imports
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
htmlExternalsPlugin = new HtmlWebpackExternalsPlugin({
  externals: [
    {
      module: 'socket.io-client',
      entry: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.slim.js',
      global: 'io'
    },
    {
      module: 'react',
      entry: 'https://unpkg.com/react@16/umd/react.development.js',
      global: 'React'
    },
    {
      module: 'react-dom',
      entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
      global: 'ReactDOM'
    },
  ]
});

// select files corresponding to entry points
const entryFiles = glob.sync('client/src/ts/*.entry.{ts,tsx}');

// customize config for each entry point
module.exports = entryFiles.map(function(file) {
  const ext = path.extname(file);
  const name = path.basename(file, '.entry' + ext);
  const entry = './' + file;
  const output = {
    filename: name + '.js',
    path: path.resolve(__dirname, 'client/dist')
  };
  const htmlPlugin = new HtmlWebpackPlugin({
    title: name,
    filename: name + '.html',
    meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
  });

  return Object.assign({}, commonConfig, {
    entry: entry,
    output: output,
    plugins: [htmlPlugin, htmlExternalsPlugin],
    devtool: 'inline-source-map'
  });
});