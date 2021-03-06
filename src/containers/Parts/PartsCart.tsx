import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AppContext, ICartState } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";
import { BaseService } from "../../services/base-service";
import { OrderService } from "../../services/order-service";
import { IOrderItem } from "../../types/IOrderItem";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ClearCart, RemoveItem } from "./Alerts/ShoppingCartAlerts";


const BlockDisplay = (props: { item: IItem, appState: ICartState }) => (
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
                <p className="font-weight-bold">Amount: {props.item.numberOfItemsToAdd}</p>
            </div>
            <button type="button" className="btn-close" id="button-close" aria-label="Close" onClick={() => RemoveItem(props.item.id, props.appState)}></button>
        </div>
    </div>
);

const PartsCart = () => {

    // TODO Clean up this section asap
    const [location, setRedirect] = useState({ redirect: false, id: '' });
    const appState = useContext(AppContext);
    const [buyerData, setBuyerData] = useState({ comment: '', email: '', firstName: '', lastName: '' });
    let numberOfItems: number = 1;
    let orderItem: IOrderItem;

    let orderId: string;
    const placeOrderClicked = async (e: Event) => {
        e.preventDefault();
        let response = await OrderService.postOrderDetails('/order_item', buyerData);
        if (!response.ok) {
            console.log("not okay");
        } else {
            console.log(orderId + " order id");
            orderItem = response.data as IOrderItem;
            orderId = orderItem!.id;

            let finalOrderBody;
            appState.items.forEach(async item => {
                numberOfItems = item.numberOfItemsToAdd;
                finalOrderBody = {
                    item,
                    numberOfItems,
                    orderItem
                }

                let responseCart = await BaseService.post('/cart', finalOrderBody);
                if (!responseCart.ok) {
                    console.log("not okay");
                } else {
                    appState.setItemToCart([]);
                }
            }
            )

        }
        setRedirect({ redirect: true, id: orderId });
    }
    return (
        <>
            {location.id !== '' ? <Redirect to={"/confirmation/" + location.id} /> : null}
            {appState.items.length !== 0 ?
                <div className="container">
                    <div className="note">
                        <p>Order Confirmation</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="col-sm">
                            {appState.items.map(item =>
                                <BlockDisplay item={item} key={item.id} appState={appState} />
                            )}
                            <div className="form-group mt-3">
                                <button onClick={() => ClearCart(appState)} type="submit" id="clear-cart-button" className="btn btn-outline-dark mt-auto">Clear Cart</button>
                            </div>
                        </div>
                        <div className="col-sm m-5">
                            <div className="order-submit container register-form ml-5">
                                <form className="ml-5" onSubmit={(e) => placeOrderClicked(e.nativeEvent)}>
                                    <div className="form-content">
                                        <div className="form-group">
                                            <label htmlFor="Input_FirstName">First Name</label>
                                            <input value={buyerData.firstName} onChange={e => setBuyerData({ ...buyerData, firstName: e.target.value })} className="form-control" type="text" id="Input_FirstName" name="Input.FirstName" placeholder="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Input_LastName">Last Name</label>
                                            <input value={buyerData.lastName} onChange={e => setBuyerData({ ...buyerData, lastName: e.target.value })} className="form-control" type="text" id="Input_LastName" name="Input.LastName" placeholder="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Input_Email">Email</label>
                                            <input value={buyerData.email} onChange={e => setBuyerData({ ...buyerData, email: e.target.value })} className="form-control" type="email" id="Input_Email" name="Input.Email" placeholder="user@example.com" />
                                        </div>
                                        <div className="form-group">
                                            <button onClick={(e) => placeOrderClicked(e.nativeEvent)} type="submit" className="btn btn-primary mt-auto">Place Order</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="container px-4 px-lg-5">
                    <div className="row">
                        <div className="col-sm p-5">
                            <div className="alert alert-primary" role="alert">
                                Cart is Empty!
                            </div>
                        </div>
                        <div className="col-sm p-5">
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default PartsCart;