import { AddValueAction, ResetValueAction, SubstructValueAction } from "../types";

export enum COUNTER_ACTION_TYPES {
    ADD_TO_COUNTER = 'COUNTER:ADD',
    SUBSTRUCT_FROM_COUNTER = 'COUNTER:SUBSTRUCT',
    RESET_VALUE = 'COUNTER:RESET'
}

export const addToCounter = (value: number): AddValueAction => ({
    type: COUNTER_ACTION_TYPES.ADD_TO_COUNTER,
    payload: value
});

export const substructFromCounter = (value: number): SubstructValueAction => ({
    type: COUNTER_ACTION_TYPES.SUBSTRUCT_FROM_COUNTER,
    payload: value
});

export const resetCounter = (): ResetValueAction => ({
    type: COUNTER_ACTION_TYPES.RESET_VALUE
});