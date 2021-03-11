import { Pair } from "./Pair";
export declare class DropDownOptions<a> {
    defaultValue: a;
    options: Array<Pair<string, a>>;
    constructor(v: a, options: Array<Pair<string, a>>);
}
