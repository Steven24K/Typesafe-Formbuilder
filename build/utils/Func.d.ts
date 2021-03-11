export interface Func<a, b> {
    f: (_: a) => b;
    then: <c>(this: Func<a, b>, g: Func<b, c>) => Func<a, c>;
    repeat: (this: Func<a, a>) => Func<number, Func<a, a>>;
    repeatUntil: (this: Func<a, a>) => Func<Func<a, boolean>, Func<a, a>>;
}
export declare let Func: <a, b>(f: (_: a) => b) => Func<a, b>;
export declare let Identity: <a>() => Func<a, a>;
