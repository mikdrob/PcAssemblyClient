import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";

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

            </div>
        </div>
    </div>
);

const Orders = () => {

    const appState = useContext(AppContext);

    
    return (

        <div className="container">
            <div className="row">
                <div className="col-sm">
                    {appState.items.map(item => 
                        <BlockDisplay item={item} key={item.id} />
                        )}
                </div>
            </div>
        </div>
    )
}

export default Orders;