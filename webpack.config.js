import * as path from 'path';
import * as url from 'url';

export const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
    devtool: 'source-map',
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: ['babel-loader'],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.css'],
        fallback: {
            console: path.resolve(__dirname, 'src/polyfills.js'),
        },
        modules: ['node_modules'],
    },
};
