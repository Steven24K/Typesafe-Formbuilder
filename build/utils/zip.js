"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
const Pair_1 = require("./Pair");
exports.zip = (l1, l2) => {
    if (l1.length != l2.length) {
        throw 'Zip(): Not equal lenght exception';
    }
    else if (l1.length == 0 && l2.length == 0) {
        return [];
    }
    else {
        let v1 = l1.pop();
        let v2 = l2.pop();
        if (v1 != undefined && v2 != undefined) {
            return exports.zip(l1, l2).concat([Pair_1.Pair(v1, v2)]);
        }
        else {
            throw 'Zip(): Value undefined exception';
        }
    }
};
