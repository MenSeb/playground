import * as path from 'path';
import { merge } from 'webpack-merge';
import config, { __dirname } from './webpack.config.js';

export default merge(config, {
    entry: path.resolve(__dirname, 'src/server/index.js'),
    output: {
        filename: 'scripts/server/index.js',
    },
    externals: {
        express: 'express',
        cors: 'cors',
        dotenv: 'dotenv',
    },
});
