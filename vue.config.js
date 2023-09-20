const { SquooshPlugin } = require("squoosh-webpack-plugin");

module.exports = {
    publicPath: "./",
    configureWebpack: config => {
        config.optimization = {
            minimize: true,
            minimizer: [
                new SquooshPlugin({
                    outDir: 'dist/img',
                    codec: 'webp',
                    encoderOptions: {
                        quality: 80,
                    }
                }),
            ],
        }
    }
}

/*module.exports = {
    configureWebpack: {
        publicPath: "./",
        plugins: [
            new SquooshPlugin({
                outDir: 'dist/images'
            })
        ]
    }
}*/