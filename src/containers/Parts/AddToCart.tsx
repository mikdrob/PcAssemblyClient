import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";
import InputSpinner from 'react-bootstrap-input-spinner'
import { Link } from "react-router-dom";

const BlockDisplay = (props: { item: IItem }) => {

    const appState = useContext(AppContext);
    const [numberOfItems, setNumberOfItems] = useState("1");



    const AddToCart = (itemToAdd: IItem) => {
        itemToAdd.numberOfItemsToAdd = parseInt(numberOfItems);
        let cartItems = [...appState.items];
        cartItems = [...cartItems, itemToAdd];
        appState.setItemToCart(cartItems);
        itemToAdd.itemAddedToCart = true;

    }

    return (
        <div className="col mb-5">
            <div className="card h-100">
                <Link to={"/part/" + props.item.id}>
                    <img className="card-img-top" src={props.item.pictureUrl} alt="..." />
                </Link>
                <div className="card-body">
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="card-body p-4">
                        <div className="text-center">
                            <h5 className="fw-bolder">{props.item.title}</h5>
                            <span className="mr-1">
                                <del>{new Intl.NumberFormat("en-GB", {
                                    style: "currency",
                                    currency: "EUR"
                                }).format(props.item.price * 1.2)}</del>
                            </span>
                            <span className="font-weight-bold">{new Intl.NumberFormat("en-GB", {
                                style: "currency",
                                currency: "EUR"
                            }).format(props.item.price)}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" disabled={props.item.itemAddedToCart} className="btn btn-outline-dark mt-auto" onClick={() => AddToCart(props.item)} >
                            Add To Cart
                        </button>

                    </div>
                    <div className="col-sm mt-5 " >
                        <div className="mx-auto" style={{maxWidth:"60%"}} >
                            <div className="col">
                                <InputSpinner
                                    type={'int'}
                                    precision={0}
                                    max={100}
                                    min={1}
                                    step={1}
                                    value={parseInt(numberOfItems)}
                                    onChange={(event: number) => { setNumberOfItems(event.toString()) }}
                                    variant={'dark'}
                                    size="sm"
                                />
                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlockDisplay;