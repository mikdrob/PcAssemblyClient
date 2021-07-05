import { AddValueAction, Counter, CounterActions, SubstructValueAction } from "../types";
import { COUNTER_ACTION_TYPES } from "./actions";

export const initialState: Counter = { step: 1, value: 1 }

export const counter = (
    state: Counter = initialState,
    action: CounterActions
) => {
    const newState: Counter = {
        step: state.step,
        value: state.value
    }
    switch (action.type) {
        case COUNTER_ACTION_TYPES.ADD_TO_COUNTER:
            newState.step = (action as AddValueAction).payload;
            newState.value += newState.step;
            return newState;
        case COUNTER_ACTION_TYPES.SUBSTRUCT_FROM_COUNTER:
            newState.step = (action as SubstructValueAction).payload;
            newState.value -= newState.step;
            return newState;
        case COUNTER_ACTION_TYPES.RESET_VALUE:
            return { ...newState, ...{ step: 1, value: newState.value } };
        default: return state;
    }
};
