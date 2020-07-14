"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pair_1 = require("./utils/Pair");
const createArray_1 = require("./utils/createArray");
const Omit_1 = require("./utils/Omit");
const Pick_1 = require("./utils/Pick");
const zip_1 = require("./utils/zip");
const createFormfields_1 = require("./utils/createFormfields");
exports.FormBuilder = ({
    Entity: function (data, q) {
        let result = q.f(exports.InitialFormSelector([data]));
        return Renderer(result.data.Second);
    },
    Entities: function (data, q) {
        let result = q.f(exports.InitialFormSelector(data));
        return Renderer(result.data.Second);
    }
});
exports.InitialFormSelector = (e) => ({
    data: Pair_1.Pair(e, createArray_1.createArray(e.length)),
    Select: function (...properties) {
        return exports.FormSelector(this.data.map(fst => fst.map(entry => Omit_1.omitMany(entry, properties)), snd => zip_1.zip(snd, this.data.First.map(entry => Pick_1.pickMany(entry, properties))).map(p => ({ ...p.First, ...p.Second }))));
    }
});
exports.FormSelector = (e) => ({
    data: e,
    Select: function (...properties) {
        return exports.FormSelector(this.data.map(fst => fst.map(entry => Omit_1.omitMany(entry, properties)), snd => zip_1.zip(snd, this.data.First.map(entry => Pick_1.pickMany(entry, properties))).map(p => ({ ...p.First, ...p.Second }))));
    },
    UnSelect: function (...properties) {
        return exports.FormSelector(this.data.map(fst => zip_1.zip(fst, this.data.Second.map(entry => Pick_1.pickMany(entry, properties))).map(p => ({ ...p.First, ...p.Second })), snd => snd.map(entry => Omit_1.omitMany(entry, properties))));
    },
    Children: function (child, q) {
        return exports.FormSelector(this.data.map(fst => fst.map(entry => Omit_1.omitOne(entry, child)), snd => zip_1.zip(snd, this.data.First.map(entry => ({ [child]: q.f(exports.InitialFormSelector(entry[child])).data.Second })))
            .reverse()
            .map(p => ({ ...p.First, ...p.Second }))));
    },
    ChildrenObject: function (child, q) {
        return exports.FormSelector(this.data.map(fst => fst.map(entry => Omit_1.omitOne(entry, child)), snd => zip_1.zip(snd, this.data.First.map(entry => ({ [child]: q.f(exports.InitialFormSelector([entry[child]])).data.Second[0] })))
            .reverse()
            .map(p => ({ ...p.First, ...p.Second }))));
    },
    AssignAny: function (property, new_value) {
        return exports.FormSelector(this.data.mapRight(snd => snd.map(e => ({ ...e, [property]: new_value }))));
    },
    Assign: function (property, new_value) {
        return exports.FormSelector(this.data.mapRight(snd => snd.map(e => ({ ...e, [property]: new_value }))));
    },
    AssignWhere: function (property, value, condition) {
        return exports.FormSelector(this.data.mapRight(snd => snd.reduce((xs, x) => {
            if (condition.f(x)) {
                return xs.concat({ ...x, [property]: value });
            }
            else {
                return xs.concat(x);
            }
        }, Array())));
    },
});
let Renderer = (d) => ({
    data: d,
    getFields: function () {
        return createFormfields_1.createFormFields(this.data);
    }
});
// Example 
// let form = FormBuilder.Entity(DefaultSpec, Func(q => q
//     .Select('project_name')
//     .Select('colors')
//     .Children('models', Func(q => q
//         .Select('name').Select('type')
//     ))
// ))
