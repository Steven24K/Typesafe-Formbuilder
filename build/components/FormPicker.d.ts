import React from 'react';
import { FormField } from '../types/FormField';
declare type FormPickerProps<T> = {
    defaultData: T[];
    fields: FormField[];
    id_prefix: string;
    listSeperator: string;
    onChange: <a>(key: string, newValue: a, index: number) => void;
};
declare type FormPickerState<T> = {};
export default class FormPicker<T> extends React.Component<FormPickerProps<T>, FormPickerState<T>> {
    constructor(props: FormPickerProps<T>);
    static defaultProps: {
        listSeperator: string;
    };
    idGenerator: (prefix: string, attribute_name: string, index: number) => string;
    render(): JSX.Element;
}
export {};
