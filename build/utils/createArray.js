"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArray = void 0;
exports.createArray = (n) => {
    // Max stack size exceeded
    //return n == 0 ? [] : [{}].concat(createArray(n - 1))
    let result = Array();
    for (let c = 0; c < n; c++) {
        result.push({});
    }
    return result;
};
