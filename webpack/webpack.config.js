const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        service_worker: path.resolve(
            __dirname,
            '..',
            'src',
            'service_worker.ts'
        ),
        content: path.resolve(__dirname, '..', 'src', 'content.ts'),
        popup: path.resolve(__dirname, '..', 'src', 'popup', 'popup.ts'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: '.', to: '.', context: 'public', noErrorOnMissing: true},
                {
                    from: path.resolve(
                        __dirname,
                        '..',
                        'src',
                        'popup',
                        'popup.html'
                    ),
                    to: '.',
                    context: 'public',
                    noErrorOnMissing: true,
                },
                {
                    from: path.resolve(__dirname, '..', 'manifest.json'),
                    to: '.',
                    context: 'public',
                    noErrorOnMissing: true,
                },
                {
                    from: path.resolve(__dirname, '..', 'src', '**', '*.png'),
                    to: '.',
                    context: 'src',
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
};
