"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformText = void 0;
const jsXss = require("xss");
const whiteList = {};
Object.entries(jsXss.whiteList).forEach(([key, value]) => {
    whiteList[key] = ['style'].concat(value);
});
const xss = new jsXss.FilterXSS({
    css: false,
    whiteList
});
const transformText = (data) => xss.process(data.value);
exports.transformText = transformText;
