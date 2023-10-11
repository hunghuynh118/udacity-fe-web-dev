const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.scss$/,
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
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 3000,
        proxy: {
            "/get-geonames-location": "http://localhost:3001",
            "/get-weatherbit-forecast": "http://localhost:3001",
            "/get-pixabay-image": "http://localhost:3001",
            "/get-saved-trips": "http://localhost:3001",
            "/save-trip": "http://localhost:3001",
            "/remove-trip": "http://localhost:3001",
        },
    },
});
