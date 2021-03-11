interface PairType<T, U> {
    First: T;
    Second: U;
}
interface PairOperations<T, U> {
    map: <TResult, UResult>(this: Pair<T, U>, f: (_: T) => TResult, g: (_: U) => UResult) => Pair<TResult, UResult>;
    mapLeft: <TResult>(this: Pair<T, U>, f: (_: T) => TResult) => Pair<TResult, U>;
    mapRight: <UResult>(this: Pair<T, U>, g: (_: U) => UResult) => Pair<T, UResult>;
}
export declare type Pair<T, U> = PairType<T, U> & PairOperations<T, U>;
export declare const Pair: <T, U>(first: T, second: U) => Pair<T, U>;
export {};
