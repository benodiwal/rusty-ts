export type Some<T> = {
    type: 'Some',
    value: T,
};

export type None = {
    type: 'None',
};

export type Option<T> = Some<T> | None;
