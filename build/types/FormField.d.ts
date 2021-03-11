import { DropDownOptions } from "../utils/DropdownOptions";
export declare type FormType = 'text' | 'number' | 'checkbox' | 'select' | 'date' | 'nestedList' | 'primitiveList' | 'form' | 'nestedObject' | 'color' | 'none';
export declare type FormField = {
    type: 'text';
    name: string;
    index: number;
} | {
    type: 'number';
    name: string;
    index: number;
} | {
    type: 'checkbox';
    name: string;
    index: number;
} | {
    type: 'none';
    name: string;
    index: number;
} | {
    type: 'form';
    name: string;
    index: number;
    fields: FormField[];
} | {
    type: 'nestedObject';
    name: string;
    index: number;
    fields: FormField[];
} | {
    type: 'color';
    name: string;
    index: number;
} | {
    type: 'select';
    name: string;
    index: number;
    options: DropDownOptions<any>;
} | {
    type: 'primitiveList';
    name: string;
    index: number;
} | {
    type: 'date';
    name: string;
    index: number;
} | {
    type: 'nestedList';
    name: string;
    index: number;
    lists: any[][];
};
