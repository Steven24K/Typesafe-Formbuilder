"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickMany = exports.pickOne = void 0;
exports.pickOne = (entity, props) => {
    return { [props]: entity[props] };
};
exports.pickMany = (entity, props) => {
    return props.reduce((s, prop) => (s[prop] = entity[prop], s), {});
};
