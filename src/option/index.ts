import { Option, Some, None } from "./types";

export class Options {
    static some<T>(value: T): Option<T> {
        return { type: 'Some', value  };
    }

    static none(): Option<never> {
        return { type: 'None' };
    }

    static isSome<T>(option: Option<T>): option is Some<T> {
        return option.type === 'Some';
    }

    static isNone<T>(option: Option<T>): option is None {
        return option.type === 'None';
    }

    static unwrap<T>(option: Option<T>): T {
        if (Options.isSome(option)) {
            return option.value;
        }
        throw new Error('Called unwrap on a None value');
    }

    static unwrapOr<T>(option: Option<T>, defaultValue: T): T {
        return Options.isSome(option) ? option.value : defaultValue;
    }

    static unwraporElse<T>(option: Option<T>, fn: () => T): T {
        return Options.isSome(option) ? option.value : fn();
    }

    static map<T, U>(option: Option<T>, fn: (value: T) => U): Option<U> {
        return Options.isSome(option) ? Options.some(fn(option.value)) : option;
    }

    static andThen<T, U>(option: Option<T>, fn: (value: T) => Option<U>): Option<U> {
        return Options.isSome(option) ? fn(option.value) : option;
    }
}
