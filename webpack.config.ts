import path from 'path';

export default {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        libraryTarget: 'umd',
        globalObject: 'globalThis',
    },
    watchOptions: {
        ignored: ['node_modules', './src/stories'],
        aggregateTimeout: 300
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    externals: {
        'react': 'react'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.module\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ],
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
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
