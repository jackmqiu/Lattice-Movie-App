const webpack = require('webpack');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV !== 'production';
console.log(process.env.NODE_ENV);

const SOURCE_PATH = path.resolve(__dirname, './src');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const CLEAN_PATH = path.join(BUILD_PATH, '*');


const JS_PATH = path.resolve(SOURCE_PATH, './js');
const HTML_PATH = path.resolve(SOURCE_PATH, './index.ejs');

const ENTRY_FILE = path.resolve(JS_PATH, './index.js');


const VERSION = moment.utc().format('YYYYMMDDHHmmss');


/*
  COMMON CONFIG
*/

// Common Rules
const rules = [{ 
  test: /\.(js|jsx)$/, 
  use: [
    'babel-loader',
    // 'eslint-loader'
  ],
  exclude: [/node_modules/]
}, {
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/font-woff',
      name: `assets/[name]-${VERSION}.[ext]`
    }
  }
}, {
  test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: `assets/[name]-${VERSION}.[ext]`
    }
  }
}, {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'image/svg+xml',
      name: `assets/[name]-${VERSION}.[ext]`
    }
  }
}, {
  test: /\.(?:ico|gif|png|jpg|jpeg|webp|mp4)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: `assets/[name]-${VERSION}.[ext]`
    }
  }
}];

// Common Plugins
const plugins = [
  new ExtractTextPlugin(`app-${VERSION}.css`),
  new CleanWebpackPlugin([CLEAN_PATH]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_URL: JSON.stringify(process.env.API_URL),
      API_KEY: JSON.stringify(process.env.API_KEY),
      API_TOKEN: JSON.stringify(process.env.API_TOKEN),
    }
  }),
  new HtmlWebpackPlugin({
    template: HTML_PATH,
    path: BUILD_PATH,
    filename: 'index.html',
  }),
];



if (IS_DEV) {
  /*
    DEVELOPMENT BUILD CONFIG
  */
  rules.push({
    test: /\.(sass|scss)$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
      options: { importLoaders: 2,
        alias: {
          '/../assets': path.join(__dirname, '/src/assets/')
        },
        sourceMap: true,
        modules: true,
        localIdentName: '[local]'
      },
    }, {
      loader: 'sass-loader',
      options: { sourceMap: true }
    }]
  });
  plugins.push(
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin() // display relative path in HMR
  );
} else {
  /*
    PRODUCTION BUILD CONFIG
  */
  rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          alias: {
            '/../assets': path.join(__dirname, '/src/assets/')
          }
        }
      }, {
        loader: 'postcss-loader',
        options: postcssLoaderOptions
      }, {
        loader: 'sass-loader',
        options: { outputStyle: 'compressed' }
      }]
    })
  });

  plugins.push(
    new CaseSensitivePathsPlugin(),
    // new ExtractTextPlugin(`app-${VERSION}.css`),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          sequences     : true,  // default: : true. join consecutive statemets with the “comma operator”
          // properties    : true,  // default: : true. optimize property access: a["foo"] → a.foo
          dead_code     : true,  // default: : true. discard unreachable code
          drop_debugger : true,  // default: : true. discard “debugger” statements
          // unsafe        : false, // default: : false. some unsafe optimizations (see below)
          conditionals  : true,  // default: : true. optimize if-s and conditional expressions
          comparisons   : true,  // default: : true. optimize comparisons
          evaluate      : true,  // default: : true. evaluate constant expressions
          // booleans      : true,  // default: : true. optimize boolean expressions
          // loops         : true,  // default: : true. optimize loops
          unused        : true,  // default: : true. drop unused variables/functions
          // hoist_funs    : true,  // default: : true. hoist function declarations
          // hoist_vars    : false, // default: : false. hoist variable declarations
          if_return     : true,  // default: : true. optimize if-s followed by return/continue
          join_vars     : true,  // default: : true. join var declarations
          // cascade       : true,  // default: : true. try to cascade `right` into `left` in sequences
          // side_effects  : true,  // default: : true. drop side-effect-free statements
          warnings      : false,  // default: : true. warn about potentially dangerous optimizations/code
          // global_defs   : {}     // default: {}. global definitions
        },
        output: {
          comments: false
        }
      }
    })
  );
}

/*
  EXPORT WEBPACK CONFIG OBJECT
*/
module.exports = {
  devtool: IS_DEV ? 'source-map' : false,
  entry: {
    app: ENTRY_FILE,
  },
  output: {
    filename: `[name]-${VERSION}.js`,
    path: BUILD_PATH,
    publicPath: '/'
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  // TODO: enable alias when webpack issue is resolved:
  // https://github.com/webpack/webpack/issues/4160
  // Suggested solution: change path.resolve to path.join
    alias: {
      Assets: path.join(__dirname, '/src/assets/'),
      Js: path.join(__dirname, '/src/js/'),
      Scss: path.join(__dirname, '/src/scss/'),
      ActionCreators: path.join(__dirname, '/src/js/actionCreators/'),
      Constants: path.join(__dirname, '/src/js/constants/'),
      Reducers: path.join(__dirname, '/src/js/reducers/'),
      Utils: path.join(__dirname, '/src/js/utils/'),
      Views: path.join(__dirname, '/src/js/views/'),
      Components: path.join(__dirname, '/src/js/views/components/'),
    }
  },
  plugins,
  devServer:{
    contentBase: SOURCE_PATH,
    port: process.env.PORT || 3000,
    hot: true,
    historyApiFallback: true
  }
}