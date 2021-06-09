import { IItem } from "./IItem";

export interface IOrder {
    id: string,
    firstName: string,
    lastName: number,
    email: string
    items: IItem[]
}