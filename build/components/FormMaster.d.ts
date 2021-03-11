import React from 'react';
import { FormField } from "../types/FormField";
import { Query } from "../LazyFormBuilder";
declare type FormMasterProps<T> = {
    defaultData: T[];
    query: Query<T, any, any>;
    id_prefix: string;
    listSeperator: string;
    onChange: <a>(key: string, newValue: a, index: number) => void;
};
declare type FormMasterState = {
    fields: FormField[];
};
export default class FormMaster<T> extends React.Component<FormMasterProps<T>, FormMasterState> {
    constructor(props: FormMasterProps<T>);
    static defaultProps: {
        listSeperator: string;
    };
    componentDidUpdate(prevProps: FormMasterProps<T>, prevState: FormMasterState): void;
    componentWillMount(): void;
    render(): JSX.Element;
}
export {};
