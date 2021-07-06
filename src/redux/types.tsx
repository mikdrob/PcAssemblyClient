export type Counter = {
    value: number;
}
// big overall state
export type AppState = {
    counter: Counter,
    // add more sub-states here
}

export type AddValueAction = {
    type: string,
    payload: number;
}

export type SubstructValueAction = {
    type: string,
    payload: number;
}

export type ResetValueAction = {
    type: string
}

export type CounterActions = AddValueAction | SubstructValueAction | ResetValueAction;