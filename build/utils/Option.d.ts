export declare type Option<T> = {
    kind: 'none';
} | {
    kind: 'some';
    value: T;
};
export declare const None: <T>() => Option<T>;
export declare const Some: <T>(v: T) => Option<T>;
