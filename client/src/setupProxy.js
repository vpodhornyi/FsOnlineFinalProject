const { createProxyMiddleware } = require("http-proxy-middleware");

const setupProxy = (app) => {
  app.use(process.env.REACT_APP_API_VERSION,
    createProxyMiddleware({
      target: `http://localhost:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true,
    }),
  );
};

module.exports = setupProxy;
