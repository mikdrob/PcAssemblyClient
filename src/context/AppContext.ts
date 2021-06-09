import React from "react";
import { IItem } from "../domain/IItem";
// import { IItem } from "../domain/IItem";

export interface ICartState {
    items: IItem[]
    setItemToCart: (items: IItem[]) => void;
}

export const initialCartState : ICartState = {
    items: [],
    setItemToCart: (): void => {}
}

export const AppContext = React.createContext<ICartState>(initialCartState);
export const AppContextConsumer = AppContext.Consumer;
export const AppContextProvider = AppContext.Provider