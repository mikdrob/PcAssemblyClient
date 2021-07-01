import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";
import InputSpinner from 'react-bootstrap-input-spinner'

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
        // <div className="card mt-5">
        //     <div className="row">
        //         <div className="col-sm">
        //             <div className="card-horizontal">
        //                 <div className="col-md-4 px-0">
        //                     <img src={props.item.pictureUrl} className="img-fluid" alt="card" />
        //                 </div>
        //                 <div className="card-body mx-auto" style={{ width: "45%" }}>
        //                     <h4 className="card-title">{props.item.title}</h4>
        //                     <p className="font-weight-bold">{new Intl.NumberFormat("en-GB", {
        //                         style: "currency",
        //                         currency: "EUR"
        //                     }).format(props.item.price)}</p>
        // <button type="button" disabled={props.item.itemAddedToCart} className="btn btn-primary" onClick={() => AddToCart(props.item)} >
        //     Add To Cart
        // </button>

        //                 </div>
        // <div className="col-sm mt-3">
        //     <InputSpinner
        //         type={'int'}
        //         precision={0}
        //         max={100}
        //         min={0}
        //         step={1}
        //         value={parseInt(numberOfItems)}
        //         onChange={(event: number) => { setNumberOfItems(event.toString()) }}
        //         variant={'dark'}
        //         size="sm"
        //     />
        // </div>
        //             </div>

        //         </div>

        //     </div>
        // </div>
        <div className="col mb-5">
            <div className="card h-100">
                <img className="card-img-top" src={props.item.pictureUrl} alt="..." />
                <div className="card-body">
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="card-body p-4">
                        <div className="text-center">
                            <h5 className="fw-bolder">{props.item.title}</h5>
                            <p className="font-weight-bold">{new Intl.NumberFormat("en-GB", {
                                style: "currency",
                                currency: "EUR"
                            }).format(props.item.price)}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" disabled={props.item.itemAddedToCart} className="btn btn-outline-dark mt-auto" onClick={() => AddToCart(props.item)} >
                            Add To Cart
                        </button>

                    </div>
                    <div className="col-sm mt-4" >
                        <div className="mx-auto w-50" >
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