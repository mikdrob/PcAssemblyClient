import { confirmAlert } from "react-confirm-alert";
import { ICartState } from "../../../context/AppContext";

const CONFIRM_MESSAGE:string = "Confirm Action";
const CLEAR_CART_MESSAGE:string = "Are you sure you want to remove all items from your shopping cart?";
const REMOVE_ITEM_MESSAGE:string = "Are you sure you want to remove this item?";

export const RemoveItem = (id: string, appState: ICartState) => {

    confirmAlert({
        title: CONFIRM_MESSAGE,
        message: REMOVE_ITEM_MESSAGE,
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    appState.items = appState.items.filter(function (item) {
                        return item.id !== id;
                    });
                    appState.setItemToCart(appState.items);
                }
            },
            {
                label: 'No',
                onClick: () => {}
            }
        ]
    });
}

export const ClearCart = (appState: ICartState) => {

    confirmAlert({
        title: CONFIRM_MESSAGE,
        message: CLEAR_CART_MESSAGE,
        buttons: [
            {
                label: 'Yes',
                onClick: () => appState.setItemToCart([])
            },
            {
                label: 'No',
                onClick: () => {}
            }
        ]
    });
}