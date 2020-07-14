"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class FormPicker extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.idGenerator = (prefix, attribute_name, index) => `${prefix}?${attribute_name}?${index}`;
        this.state = {
            fields: []
        };
        this.idGenerator = this.idGenerator.bind(this);
    }
    render() {
        return react_1.default.createElement("div", null,
            react_1.default.createElement("div", null, this.props.fields.map((field) => {
                switch (field.type) {
                    case "checkbox":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            this.props.defaultData[field.index][field.name] ?
                                react_1.default.createElement("input", { onChange: (event) => this.props.onChange(field.name, false, field.index), checked: true, type: 'checkbox' })
                                :
                                    react_1.default.createElement("input", { onChange: (event) => this.props.onChange(field.name, true, field.index), type: 'checkbox' }));
                    case "number":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            react_1.default.createElement("input", { onChange: (event) => this.props.onChange(field.name, Number(event.target.value), field.index), type: 'number', value: this.props.defaultData[field.index][field.name] }));
                    case "text":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            react_1.default.createElement("input", { onChange: (event) => this.props.onChange(field.name, String(event.target.value), field.index), type: 'text', value: this.props.defaultData[field.index][field.name] }));
                    case "primitiveList":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            react_1.default.createElement("textarea", { onChange: (event) => {
                                    let values = event.target.value.split(this.props.listSeperator);
                                    this.props.onChange(field.name, values, field.index);
                                }, cols: 30, rows: 5, placeholder: `Divide values by '${this.props.listSeperator}'`, value: this.props.defaultData[field.index][field.name] }));
                    case "nestedList":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            field.lists.map((list, index) => react_1.default.createElement("textarea", { cols: 10, rows: 2, placeholder: `Divide values by '${this.props.listSeperator}'`, value: list.toString(), key: index, onChange: event => {
                                    let nestedList = this.props.defaultData[field.index][field.name];
                                    nestedList[index] = event.target.value.split(this.props.listSeperator);
                                    this.props.onChange(field.name, nestedList, field.index);
                                } })));
                    case "select":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            react_1.default.createElement("select", { onChange: (event) => this.props.onChange(field.name, event.target.value, field.index), defaultValue: this.props.defaultData[field.index][field.name] }, field.options.options.map(option => react_1.default.createElement("option", { value: option.Second, key: option.Second }, option.First))));
                    case "date":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            react_1.default.createElement("input", { onChange: (event) => {
                                    // date is still in the wrong format
                                    let date = event.target.value; //new Date(event.target.value)
                                    this.props.onChange(field.name, date, field.index);
                                }, type: 'date', value: this.props.defaultData[field.index][field.name] }));
                    case "color":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            react_1.default.createElement("input", { onChange: (event) => this.props.onChange(field.name, String(event.target.value), field.index), type: 'color', value: this.props.defaultData[field.index][field.name] }));
                    case "form":
                        return react_1.default.createElement("div", { style: { marginLeft: 30 }, key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null,
                                react_1.default.createElement("b", null, field.name)),
                            react_1.default.createElement(FormPicker, { id_prefix: field.name, defaultData: this.props.defaultData[field.index][field.name], fields: field.fields, onChange: (key, newValue, index) => {
                                    let nested_data = this.props.defaultData[field.index][field.name];
                                    let new_entry = { ...nested_data[index], [key]: newValue };
                                    nested_data[index] = new_entry;
                                    //console.log(nested_data)
                                    this.props.onChange(field.name, nested_data, index);
                                } }));
                    case "nestedObject":
                        return react_1.default.createElement("div", { style: { marginLeft: 30 }, key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null,
                                react_1.default.createElement("b", null, field.name)),
                            react_1.default.createElement(FormPicker, { id_prefix: field.name, defaultData: [this.props.defaultData[field.index][field.name]], fields: field.fields, onChange: (key, newValue, index) => {
                                    let nested_data = this.props.defaultData[field.index][field.name];
                                    let new_entry = { ...nested_data, [key]: newValue };
                                    nested_data = new_entry;
                                    console.log(nested_data);
                                    this.props.onChange(field.name, nested_data, index);
                                } }));
                    case "none":
                        return react_1.default.createElement("div", { key: this.idGenerator(this.props.id_prefix, field.name, field.index) },
                            react_1.default.createElement("label", null, field.name),
                            react_1.default.createElement("div", null, "No Form"));
                    default:
                        return react_1.default.createElement("div", null, "No Form");
                }
            })));
    }
}
exports.default = FormPicker;
FormPicker.defaultProps = {
    listSeperator: ','
};
