"use strict";
const path = require("path");
const port = process.env.port || process.env.npm_config_port || 8080;
module.exports = {
  // publicPath: "/",
  // outputDir: "dist",
  // assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.join(__dirname, "./src"))
      .set("a", path.join(__dirname, "./src/assets"))
      .set("c", path.join(__dirname, "./src/components"))
      .set("u", path.join(__dirname, "./src/utils"))
      .set("r", path.join(__dirname, "./src/router"))
      .set("s", path.join(__dirname, "./src/store"))
      .set("p", path.join(__dirname, "./src/pages"));
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },

    headers: {
      "Access-Control-Allow-Origin": "*", //允许所有域名访问
      "Access-Control-Allow-Credentials": "true", //是否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回
    },
    proxy: {
      // 开发环境代理配置
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true, // 开启代理服务器，
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
};
