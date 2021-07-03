import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItem } from "../../domain/IItem";
import { IOrderConfirmed } from "../../domain/IOrderConfirmed";
import { BaseService } from "../../services/base-service";

import { IRouteId } from "../../types/IRouteId";

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

const Confirmation = () => {

    const { id } = useParams() as IRouteId;
    const [order, setOrder] = useState({} as IOrderConfirmed);



    const loadData = async () => {

        let result = await BaseService.get<IOrderConfirmed>('/order_item', id);
        if (result.ok && result.data) {
            setOrder(result.data);

            let email = await BaseService.get('/order_item/mail', id)
            if (email.ok) {
                console.log("works");
            }
        }
        else {
            console.log("not okay");
        }

    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (

        <div className="container">
            <div className="row">
                <div className="col-sm">
                    {order.items?.map(item =>
                        <BlockDisplay item={item.item} key={item.item.id} />
                    )}
                </div>
                <div className="col-sm p-4">
                    <div className="order-submit">
                        <div className="row">
                            <div className="col-md-6">
                                <section>
                                    <div className="form-group">
                                        <label htmlFor="Input_FirstName">First Name</label>
                                        <p className="font-weight-bold">{order.firstName}</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Input_LastName">Last Name</label>
                                        <p className="font-weight-bold">{order.lastName}</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Input_Email">Email</label>
                                        <p className="font-weight-bold">{order.email}</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirmation;