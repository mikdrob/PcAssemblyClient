import React from "react";
import { IItem } from "../domain/IItem";
// import { IItem } from "../domain/IItem";

export interface ICartState {
    items: IItem[],
    orderId: string | null,
    setItemToCart: (items: IItem[]) => void;
    setOrderId:(orderId: string | null) => void;
}

export const initialCartState : ICartState = {
    orderId: null,
    items: [],
    setItemToCart: (): void => {},
    setOrderId:(): void => {},
}

export const AppContext = React.createContext<ICartState>(initialCartState);
export const AppContextConsumer = AppContext.Consumer;
export const AppContextProvider = AppContext.Provider