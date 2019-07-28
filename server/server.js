const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path');
// var colors = require('colors/safe');
app.use(cookieParser());
app.use(bodyParser.json());

// nodejs 默认不知es6语法。。需要 babel 转义

import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import App from './app-babel.js';




// 其他路径 路由到静态文件入口文件
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        let html = renderToNodeStream(
            <StaticRouter>
                <App />
            </StaticRouter>
        )
        return res.sendDate(html);
    }
    return res.sendFile(path.resolve('build/index.html'))
})

// 根路径 路由到静态文件根路径
app.use('/', express.static(path.resolve('build')))

app.listen("9000",function(){
    console.log(" http://localhost:9000");
});
