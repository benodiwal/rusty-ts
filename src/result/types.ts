export type Ok<T> = {
    type: 'Ok',
    value: T,
};

export type Err<E> = {
    type: 'Err',
    error: E,
};

export type Result<T, E> = Ok<T> | Err<E>;
