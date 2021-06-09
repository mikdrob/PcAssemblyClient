import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";


const BlockDisplay = (props: { item: IItem }) => {

    const [cart, setCart] = useState([] as IItem[]);
    const appState = useContext(AppContext);

    const AddToCart = (itemToAdd: IItem) => {
        // let cartItems = [...cart];
        // cartItems = [...cartItems, itemToAdd];
        // setCart(cartItems);
        let cartItems = [...appState.items];
        cartItems = [...cartItems, itemToAdd];
        appState.setItemToCart(cartItems);
        // console.log(appState.items);

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
                    <button type="button" className="btn btn-primary" onClick={() => AddToCart(props.item)} >
                        Add To Cart
                    </button>
                    <p>{appState.items.length}</p>
                </div>
            </div>
        </div>
    )
}

export default BlockDisplay;