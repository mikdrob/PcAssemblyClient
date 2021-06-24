export interface IItem{
    id: string,
    title: string,
    price: number,
    pictureUrl: string,
    itemsAvailable: number,
    numberOfItemsToAdd: number;
    itemAddedToCart: boolean
}