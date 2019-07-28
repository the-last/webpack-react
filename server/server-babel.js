"use strict";

var _interopRequireDefault = require("/Users/gaoyabing/Documents/Object/Webend/Mycode/react_ssr/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

var _server = require("react-dom/server");

var _appBabel = _interopRequireDefault(require("./app-babel.js"));

var _jsxFileName = "/Users/gaoyabing/Documents/Object/Webend/Mycode/react_ssr/server/server.js";

const express = require("express");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const app = express();

const path = require('path');

app.use(cookieParser());
app.use(bodyParser.json()); // nodejs 默认不知es6语法。。需要 babel 转义

// 其他路径 路由到静态文件入口文件
app.use((req, res, next) => {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    let html = (0, _server.renderToNodeStream)(_react.default.createElement(_reactRouterDom.StaticRouter, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: void 0
    }, _react.default.createElement(_appBabel.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: void 0
    })));
    return res.sendDate(html);
  }

  return res.sendFile(path.resolve('build/index.html'));
}); // 根路径 路由到静态文件根路径

app.use('/', express.static(path.resolve('build')));
app.listen("9000", function () {
  console.log(" http://localhost:9000");
});
