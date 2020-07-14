"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdentityLambda_1 = require("./IdentityLambda");
exports.Pair = (first, second) => ({
    First: first,
    Second: second,
    map: function (f, g) {
        return exports.Pair(f(this.First), g(this.Second));
    },
    mapLeft: function (f) {
        return this.map(f, IdentityLambda_1.IdentityLambda());
    },
    mapRight: function (g) {
        return this.map(IdentityLambda_1.IdentityLambda(), g);
    }
});
