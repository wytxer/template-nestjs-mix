"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoRandomCharacter = exports.createAtInterval = exports.toTreeData = exports.createUuid = exports.objectToString = void 0;
const uuid_1 = require("uuid");
const moment = require("moment");
const crypto_1 = require("crypto");
const objectToString = (data) => {
    return Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
};
exports.objectToString = objectToString;
const createUuid = () => (0, uuid_1.v4)();
exports.createUuid = createUuid;
const toTreeData = (data, parentKey, parentId = 0) => {
    if (data.length <= 0)
        return [];
    function traverse(id) {
        const res = [];
        const items = data.filter((item) => item[parentKey] === id);
        if (items.length <= 0)
            return null;
        items.forEach((item) => {
            const newItem = Object.assign({}, item);
            const children = traverse(item.id);
            if (children && children.length)
                newItem.children = children;
            res.push(newItem);
        });
        return res;
    }
    return traverse(parentId);
};
exports.toTreeData = toTreeData;
const createAtInterval = (options) => {
    const { startAt, endAt, interval = 60, startIndex = 0, endOffset = 1 } = options;
    const starTime = moment(startAt);
    const endTime = moment(endAt);
    const diff = endTime.diff(starTime, 'minutes');
    const sum = Math.ceil(diff / interval);
    const times = [];
    for (let i = startIndex; i <= sum - endOffset; i += 1) {
        const t = starTime.clone().add(i * interval, 'minutes');
        times.push({
            time: t.format('YYYY-MM-DD')
        });
    }
    return times;
};
exports.createAtInterval = createAtInterval;
const cryptoRandomCharacter = (length = 8) => {
    return (0, crypto_1.randomBytes)(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};
exports.cryptoRandomCharacter = cryptoRandomCharacter;
