import { IItemInOrder } from "./IItemInOrder";

export interface IOrderConfirmed {
    id: string,
    firstName: string,
    lastName: number,
    email: string
    items: IItemInOrder[]
}