export type Ok<T> = {
    type: 'Ok',
    value: T,
};

export type Err<E extends Error> = {
    type: 'Err',
    error: E,
};

export type Result<T, E extends Error> = Ok<T> | Err<E>;
