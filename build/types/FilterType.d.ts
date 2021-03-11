export declare type FilterType<T, Condition> = {
    [K in keyof T]: T[K] extends Condition ? K : never;
}[keyof T];
