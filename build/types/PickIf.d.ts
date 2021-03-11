import { FilterType } from './FilterType';
export declare type PickIf<T, Condition> = Pick<T, FilterType<T, Condition>>;
