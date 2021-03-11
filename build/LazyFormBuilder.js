"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLazyFormSelector = exports.LazyFormSelector = void 0;
const Func_1 = require("./utils/Func");
const FormBuilder_1 = require("./FormBuilder");
let InitialLazyFormSelector = (q) => ({
    query: q,
    Select: function (...properties) {
        return exports.LazyFormSelector(this.query.then(Func_1.Func(s => s.Select(...properties))));
    }
});
exports.LazyFormSelector = (q) => ({
    query: q,
    Select: function (...properties) {
        return exports.LazyFormSelector(this.query.then(Func_1.Func(s => s.Select(...properties))));
    },
    UnSelect: function (...properties) {
        return exports.LazyFormSelector(this.query.then(Func_1.Func(s => s.UnSelect(...properties))));
    },
    Children: function (child, q) {
        return exports.LazyFormSelector(this.query.then(Func_1.Func(s => s.Children(child, q))));
    },
    ChildrenObject: function (child, q) {
        return exports.LazyFormSelector(this.query.then(Func_1.Func(s => s.ChildrenObject(child, q))));
    },
    AssignAny: function (property, new_value) {
        return exports.LazyFormSelector(this.query.then(Func_1.Func(s => s.AssignAny(property, new_value))));
    },
    Assign: function (property, new_value) {
        return exports.LazyFormSelector(this.query.then(Func_1.Func(s => s.Assign(property, new_value))));
    },
    AssignWhere: function (property, value, condition) {
        return exports.LazyFormSelector(this.query.then(Func_1.Func(s => s.AssignWhere(property, value, condition))));
    },
});
exports.createLazyFormSelector = () => {
    return exports.LazyFormSelector(Func_1.Func(initFormSelector => FormBuilder_1.FormSelector(initFormSelector.data)));
};
