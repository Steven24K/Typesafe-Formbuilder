export declare type ArrayType<T> = T extends Array<infer U> ? U : never;
