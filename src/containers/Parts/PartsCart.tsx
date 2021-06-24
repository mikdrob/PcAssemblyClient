import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { setSyntheticTrailingComments } from "typescript";
import { AppContext } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";
import { ItemsService } from "../../services/items-service";
import { OrderService } from "../../services/order-service";
import { IOrderItem } from "../../types/IOrderItem";

const BlockDisplay = (props: { item: IItem }) => (
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
        </div>
    </div>
);

const PartsCart = () => {

    // TODO Clean up this section asap
    const [location, setRedirect] = useState({ redirect: false, id: '' });
    const appState = useContext(AppContext);
    const [buyerData, setBuyerData] = useState({ comment: '', email: '', firstName: '', lastName: '' });

    let item: IItem;
    let numberOfItems: number = 1;
    let orderItem: IOrderItem;

    let orderId: string;
    const placeOrderClicked = async (e: Event) => {
        e.preventDefault();
        let response = await OrderService.postOrderDetails('/order_item', buyerData);
        if (!response.ok) {
            console.log("not okay");
        } else {
            orderId = response.data!.id;
            orderItem = response.data as IOrderItem;
            let finalOrderBody = {
                item,
                numberOfItems,
                orderItem
            }
            appState.items.forEach(async item => {
                numberOfItems = item.numberOfItemsToAdd;
                finalOrderBody = {
                    item,
                    numberOfItems,
                    orderItem
                }
                let responseCart = await ItemsService.postOrder('/cart', finalOrderBody);
                if (!responseCart.ok) {
                    console.log("not okay");
                } else {
                    console.log("ok");
                }
            }
            )

        }
        console.log(orderId);
        setRedirect({redirect: true, id: orderId});
    }
    return (
        <>
            {location.id !== '' ? <Redirect to={"/confirmation/" + location.id} /> : null}
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        {appState.items.map(item =>
                            <BlockDisplay item={item} key={item.id} />
                        )}
                    </div>
                    <div className="col-sm">
                        <form onSubmit={(e) => placeOrderClicked(e.nativeEvent)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <section>
                                        <hr />
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
                                            <button onClick={(e) => placeOrderClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Place Order</button>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartsCart;