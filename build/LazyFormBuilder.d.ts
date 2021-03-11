import { Func } from "./utils/Func";
import { InitialFormSelector, FormSelector } from "./FormBuilder";
import { Unit } from "./types/Unit";
import { FilterType } from "./types/FilterType";
import { ArrayType } from "./types/ArrayType";
import { ChangeType } from "./types/ChangeType";
export declare type Query<A, B, C> = Func<InitialFormSelector<A>, FormSelector<B, C>>;
export interface InitialLazyFormSelector<T> {
    query: Query<T, T, Unit>;
    Select: <K extends keyof T>(...properties: K[]) => LazyFormSelector<T, Omit<T, K>, Pick<T, K>>;
}
export interface LazyFormSelector<T1, T2, U> {
    query: Query<T1, T2, U>;
    Select: <K extends keyof T2>(...properties: K[]) => LazyFormSelector<T1, Omit<T2, K>, Pick<T2, K> & U>;
    UnSelect: <K extends keyof U>(...properties: K[]) => LazyFormSelector<T1, Pick<U, K> & T2, Omit<U, K>>;
    Children: <K extends FilterType<T2, Array<Object>>, t2, TResult>(child: K, q: Func<InitialFormSelector<ArrayType<T2[K]>>, FormSelector<t2, TResult>>) => LazyFormSelector<T1, Omit<T2, K>, U & {
        [key in K]: Array<TResult>;
    }>;
    ChildrenObject: <K extends FilterType<T2, Object>, t2, TResult>(child: K, q: Func<InitialFormSelector<T2[K]>, FormSelector<t2, TResult>>) => LazyFormSelector<T1, Omit<T2, K>, U & {
        [key in K]: TResult;
    }>;
    AssignAny: <K extends keyof U, A>(property: K, new_value: A) => LazyFormSelector<T1, T2, ChangeType<U, A, K>>;
    Assign: <K extends keyof U>(property: K, new_value: U[K]) => LazyFormSelector<T1, T2, U>;
    AssignWhere: <K extends keyof U>(property: K, value: U[K], condition: Func<U, boolean>) => LazyFormSelector<T1, T2, U>;
}
declare let InitialLazyFormSelector: <T>(q: Query<T, T, Unit>) => InitialLazyFormSelector<T>;
export declare let LazyFormSelector: <T1, T2, U>(q: Query<T1, T2, U>) => LazyFormSelector<T1, T2, U>;
export declare let createLazyFormSelector: <T>() => InitialLazyFormSelector<T>;
export {};
