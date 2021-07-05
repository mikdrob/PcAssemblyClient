import { combineReducers, createStore } from "redux";
import { AppState } from "./types";
import { counter } from "./increment/reducer"

export default createStore(combineReducers<AppState>({
    counter,
}))