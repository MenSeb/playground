import path from 'path';
import dotenv from 'dotenv';
import Handlebars from 'handlebars';
import { merge } from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config, { __dirname } from './webpack.config.js';
import {
    PAGES_PATH,
    PARTIALS_PATH,
    registerPages,
    registerPartials,
    WatchPartialsPlugin,
} from './src/client/index.js';

dotenv.config();

registerPartials(PARTIALS_PATH);

export default merge(config, {
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        port: process.env.PORT_CLIENT,
        proxy: [
            {
                '/api': {
                    target: `http://localhost:${process.env.PORT_CLIENT}`,
                    router: () => `http://localhost:${process.env.PORT_SERVER}`,
                    logLevel: 'debug',
                },
            },
        ],
        watchFiles: {
            paths: ['src/**/*'],
        },
    },
    entry: path.resolve(__dirname, 'src/client/scripts/index.js'),
    module: {
        rules: [
            {
                test: /\.(hbs|html)$/,
                loader: HtmlBundlerPlugin.loader,
                options: {
                    preprocessor: (content, { data }) =>
                        Handlebars.compile(content)(data),
                },
            },
            {
                test: /\.(css|s[ac]ss)$/,
                use: ['css-loader', 'sass-loader'],
            },
            {
                test: /\.(ico|jpe?g|png|svg|gif)$/,
                type: 'asset',
                generator: {
                    filename: ({ filename }) => {
                        return `images/[name]${
                            filename.endsWith('ico') ? '' : '.[hash:8]'
                        }[ext]`;
                    },
                },
                parser: {
                    dataUrlCondition: () => false,
                },
            },
        ],
    },
    resolve: {
        alias: {
            // Source paths
            '@client': path.resolve(__dirname, 'src/client'),
            '@server': path.resolve(__dirname, 'src/server'),
            '@tools': path.resolve(__dirname, 'src/tools'),
            // Client paths
            '@files': path.resolve(__dirname, 'src/client/files'),
            '@images': path.resolve(__dirname, 'src/client/images'),
            '@scripts': path.resolve(__dirname, 'src/client/scripts'),
            '@styles': path.resolve(__dirname, 'src/client/styles'),
        },
    },
    plugins: [
        new HtmlBundlerPlugin({
            // Glogal data injected in templates, use a path to trigger reload
            data: path.resolve(__dirname, 'src/client/context.json'),
            css: { filename: 'styles/index.[contenthash:8].css' },
            js: { filename: 'scripts/client/index.[contenthash:8].js' },
            entry: registerPages(PAGES_PATH),
        }),
        new WatchPartialsPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(
                        __dirname,
                        'src/client/files/manifest.json',
                    ),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZER_MODE || 'disabled',
        }),
    ],
});
