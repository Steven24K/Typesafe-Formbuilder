"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormBuilder_1 = require("../FormBuilder");
const FormPicker_1 = __importDefault(require("./FormPicker"));
class FormMaster extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { fields: [] };
    }
    componentDidUpdate(prevProps, prevState) {
        if (!Object.is(this.props.defaultData, prevProps.defaultData)) {
            this.setState({ ...this.state, fields: FormBuilder_1.FormBuilder.Entities(this.props.defaultData, this.props.query).getFields() });
        }
    }
    componentWillMount() {
        this.setState({ ...this.state, fields: FormBuilder_1.FormBuilder.Entities(this.props.defaultData, this.props.query).getFields() });
    }
    render() {
        return react_1.default.createElement(FormPicker_1.default, { id_prefix: this.props.id_prefix, defaultData: this.props.defaultData, fields: this.state.fields, onChange: this.props.onChange, listSeperator: this.props.listSeperator });
    }
}
exports.default = FormMaster;
FormMaster.defaultProps = {
    listSeperator: ','
};
