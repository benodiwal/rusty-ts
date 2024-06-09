import { Result, Ok, Err } from "./types";

export class Results {
    static ok<T>(value: T): Result<T, never> {
        return { type: 'Ok', value };
    }

    static err<E extends Error>(error: E): Result<never, E> {
        return { type: 'Err', error };
    }

    static isOk<T, E extends Error>(result: Result<T, E>): result is Ok<T> {
        return result.type === 'Ok';
    }

    static isErr<T, E extends Error>(result: Result<T, E>): result is Err<E> {
        return result.type === 'Err';
    }

    static unwrap<T, E extends Error>(result: Result<T, E>): T {
        if (Results.isOk(result)) {
            return result.value;
        }
        throw new Error('Called unwrap on an Err value');
    }

    static unwrapOr<T, E extends Error>(result: Result<T, E>, defaultValue: T): T {
        return Results.isOk(result) ? result.value : defaultValue;
    }

    static unwrapOrElse<T, E extends Error>(result: Result<T, E>, fn: (error: E) => T): T {
        return Results.isOk(result) ? result.value : fn(result.error);
    }

    static map<T, E extends Error, U>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
        return Results.isOk(result) ? Results.ok(fn(result.value)) : result;
    }

    static mapErr<T, E extends Error, F extends Error>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> {
        return Results.isErr(result) ? Results.err(fn(result.error)) : result;
    }

    static andThen<T, E extends Error, U>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E> {
        return Results.isOk(result) ? fn(result.value) : result;
    }

    static orElse<T, E extends Error, F extends Error>(result: Result<T, E>, fn: (error: E) => Result<T, F>): Result<T, F> {
        return Results.isErr(result) ? fn(result.error) : result;
    }

}
