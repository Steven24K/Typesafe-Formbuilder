export declare let pickOne: <T, K extends keyof T>(entity: T, props: K) => Pick<T, K>;
export declare let pickMany: <T, K extends keyof T>(entity: T, props: K[]) => Pick<T, K>;
