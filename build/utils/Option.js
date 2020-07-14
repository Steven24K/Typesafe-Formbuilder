"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = () => ({
    kind: 'none'
});
exports.Some = (v) => ({
    kind: 'some',
    value: v
});
