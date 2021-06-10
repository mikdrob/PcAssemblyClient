import { IItem } from "../domain/IItem";
import { IOrderItem } from "./IOrderItem";

export interface IOrderResponse{
    id: string,
    item: IItem,
    orderItem: IOrderItem
}