const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: ["./src/client/index.js"],
    mode: "production",
    devtool: "hidden-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        minimize: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: false,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
    ],
};
