"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_LOCAL = exports.IS_TEST = exports.IS_ONLINE = void 0;
exports.IS_ONLINE = process.env.NODE_ENV === 'online';
exports.IS_TEST = process.env.NODE_ENV === 'test';
exports.IS_LOCAL = process.env.NODE_ENV === 'local';
