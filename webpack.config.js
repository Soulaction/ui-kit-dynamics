const path = require("path");

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    externals: {
        react: 'react'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "images/[name].[contenthash][ext]",
                },
            },
        ],
    }
}
