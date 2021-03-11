"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Some = exports.None = void 0;
exports.None = () => ({
    kind: 'none'
});
exports.Some = (v) => ({
    kind: 'some',
    value: v
});
