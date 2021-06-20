import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";


const BlockDisplay = (props: { item: IItem }) => {

    const appState = useContext(AppContext);

    const AddToCart = (itemToAdd: IItem) => {
        let cartItems = [...appState.items];
        cartItems = [...cartItems, itemToAdd];
        appState.setItemToCart(cartItems);
        itemToAdd.itemAddedToCart = true;

    }
    return (
        <div className="card mt-5">
            <div className="card-horizontal">
                <div className="col-md-4 px-0">
                    <img src={props.item.pictureUrl} className="img-fluid" alt="card" />
                </div>
                <div className="card-body">
                    <h4 className="card-title">{props.item.title}</h4>
                    <p className="font-weight-bold">{new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "EUR"
                    }).format(props.item.price)}</p>
                    <button type="button" disabled={props.item.itemAddedToCart} className="btn btn-primary" onClick={() => AddToCart(props.item)} >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BlockDisplay;