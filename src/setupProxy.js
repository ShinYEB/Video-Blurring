const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use('/proxy',
        createProxyMiddleware(
            {
                target: 'https://a2b1.store/',
                changeOrigin: true,
            }
        )
    )
}

