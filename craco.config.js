module.exports={
    webpack: {
        configure(webpackConfig) {
          if (webpackConfig.mode === 'production') {
            if (webpackConfig.optimization == null) {
              webpackConfig.optimization = {}
            }
            webpackConfig.optimization.splitChunks = {
              chunks: 'all',
              cacheGroups: {
                antd: {
                  name: 'antd-chunk',
                  test: /antd/,
                  priority: 100,
                },
                vendors: {
                  name: 'vendors-chunk',
                  test: /node_modules/,
                  priority: 99,
                },
              },
            }
          }
          return webpackConfig
        },
      },
    devServer:{
        port:8000,
        proxy:{
            '/api':'http://localhost:3001',
        }
    }
}