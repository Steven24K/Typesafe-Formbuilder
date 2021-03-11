import { Func } from "./utils/Func";
import { Pair } from "./utils/Pair";
import { Unit } from "./types/Unit";
import { FilterType } from "./types/FilterType";
import { ArrayType } from "./types/ArrayType";
import { ChangeType } from "./types/ChangeType";
import { FormField } from "./types/FormField";
export interface FormBuilder {
    Entity: <T1, T2, TResult>(data: T1, q: Func<InitialFormSelector<T1>, FormSelector<T2, TResult>>) => Renderer<TResult>;
    Entities: <T1, T2, TResult>(data: T1[], q: Func<InitialFormSelector<T1>, FormSelector<T2, TResult>>) => Renderer<TResult>;
}
export declare let FormBuilder: FormBuilder;
export declare type Data<T, U> = Pair<T[], U[]>;
export interface InitialFormSelector<T> {
    data: Data<T, Unit>;
    Select: <K extends keyof T>(...properties: K[]) => FormSelector<Omit<T, K>, Pick<T, K>>;
}
export interface FormSelector<T, U> {
    data: Data<T, U>;
    Select: <K extends keyof T>(...properties: K[]) => FormSelector<Omit<T, K>, Pick<T, K> & U>;
    UnSelect: <K extends keyof U>(...properties: K[]) => FormSelector<Pick<U, K> & T, Omit<U, K>>;
    Children: <K extends FilterType<T, Array<Object>>, t2, TResult>(child: K, q: Func<InitialFormSelector<ArrayType<T[K]>>, FormSelector<t2, TResult>>) => FormSelector<Omit<T, K>, U & {
        [key in K]: Array<TResult>;
    }>;
    ChildrenObject: <K extends FilterType<T, Object>, t2, TResult>(child: K, q: Func<InitialFormSelector<T[K]>, FormSelector<t2, TResult>>) => FormSelector<Omit<T, K>, U & {
        [key in K]: TResult;
    }>;
    AssignAny: <K extends keyof U, A>(property: K, new_value: A) => FormSelector<T, ChangeType<U, A, K>>;
    Assign: <K extends keyof U>(property: K, new_value: U[K]) => FormSelector<T, U>;
    AssignWhere: <K extends keyof U>(property: K, value: U[K], condition: Func<U, boolean>) => FormSelector<T, U>;
}
export declare let InitialFormSelector: <T>(e: T[]) => InitialFormSelector<T>;
export declare let FormSelector: <T, U>(e: Pair<T[], U[]>) => FormSelector<T, U>;
export interface Renderer<T> {
    data: T[];
    /**
     * Attributes:
     * - Data
     * - formfields
     * - renderoptions {
     *    customValues
     *    custumOptions
     *    custumFields
     * }
     */
    getFields: () => FormField[];
}
