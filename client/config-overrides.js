const path = require("path")
const { override, addLessLoader, addWebpackAlias } = require("customize-cra")

module.exports = (config, env) => {
  config.module.rules.push({
    exclude: /node_modules/,
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: "babel-loader",
      },
      {
        loader: "@svgr/webpack",
        options: {
          babel: false,
          icon: true,
        },
      },
    ],
  })

  return override(
    addWebpackAlias({
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@containers": path.resolve(__dirname, "./src/containers"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@service": path.resolve(__dirname, "./src/services"),
    }),
    addLessLoader({
      lessOptions: {
        modules: true,
        javascriptEnabled: true,
      },
    })
  )(config, env)
}
