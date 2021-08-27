const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            secure: false,
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    );
};