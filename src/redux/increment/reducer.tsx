import { Counter, CounterActions } from "../types";
import { COUNTER_ACTION_TYPES } from "./actions";

export const initialState: Counter = { value: 1 }

export const counter = (
    state: Counter = initialState,
    action: CounterActions
) => {
    const newState: Counter = {
        value: state.value
    }
    switch (action.type) {
        case COUNTER_ACTION_TYPES.ADD_TO_COUNTER:
            newState.value += 1;
            return newState;
        case COUNTER_ACTION_TYPES.SUBSTRUCT_FROM_COUNTER:
            newState.value -= 1;
            return newState;
        case COUNTER_ACTION_TYPES.SET_VALUE:
            return newState;
        case COUNTER_ACTION_TYPES.RESET_VALUE:
            return { ...newState, ...{ value: initialState.value } };
        default: return state;
    }
};
