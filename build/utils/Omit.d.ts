export declare let omitOne: <T, K extends keyof T>(entity: T, prop: K) => Pick<T, Exclude<keyof T, K>>;
export declare let omitMany: <T, K extends keyof T>(entity: T, props: K[]) => Pick<T, Exclude<keyof T, K>>;
