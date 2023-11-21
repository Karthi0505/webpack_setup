const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const json5 = require("json5");
const path = require("path");

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  devtool: 'source-map',
  entry: SRC_DIR + "/index.js",
  output: {
    path: DIST_DIR,
    filename: "my-first-webpack.bundle.js",
  },
  mode: 'development',


  module: {
    rules: [
      {
        //I added |jsx
        test: /\.m?js$|jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: 'images/',
        },
      },

      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        options: {
          esModule: false,
        },
        type: 'javascript/auto'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Convert modern CSS into something most browsers can understand
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

    ]
  },
  devServer: {
    inline: true,
    contentBase: DIST_DIR,
    compress: true,
    port: 9000,
    proxy: {
      "/api/**": { target: 'http://localhost:5000' },
    },
    historyApiFallback: true
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html'
    })
  ]
};
