const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: ["./src/client/index.js"],
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "var",
        library: "Client",
        clean: true,
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
        minimize: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: false,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
    ],
};
