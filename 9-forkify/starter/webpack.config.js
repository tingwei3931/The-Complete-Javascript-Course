// 4 important points in webpack:
// Entry points, output, loaders and plug-ins 
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js',
    ],
    output: {
        //need to be an absolute pah
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js' //standard name for webpack output
    },
    devServer: {
        contentBase: './dist' //dist folder will hold the codes that is shipped for production mode, all the codes in src folder are for development use. 
    },
    plugins: [
        //automatically copies the html in src to the dist folder and injects the bundle.js
        new HTMLWebpackPlugin({
            filename: 'index.html', 
            template: './src/index.html',
        })
    ],
    //configure babel via webpack loaders
    module: {
        rules: [
            {
                //look for all the files and test if they end with .js
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

