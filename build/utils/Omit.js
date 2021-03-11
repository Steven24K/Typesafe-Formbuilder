"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitMany = exports.omitOne = void 0;
exports.omitOne = (entity, prop) => {
    const { [prop]: deleted, ...newState } = entity;
    return newState;
};
// Refactor this into a oneliner
exports.omitMany = (entity, props) => {
    let result = entity;
    props.forEach(prop => {
        result = exports.omitOne(result, prop);
    });
    return result;
};
