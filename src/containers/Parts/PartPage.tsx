import { useContext, useEffect, useState } from "react";
import InputSpinner from "react-bootstrap-input-spinner";
import { Link, useParams } from "react-router-dom";
import CustomLoader from "../../components/CustomLoader"
import { AppContext } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";
// import { IOrder } from "../../domain/IOrder";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";
import BlockDisplay from "./AddToCart"




const PartPage = () => {
    const { id } = useParams() as IRouteId;
    const [item, setItems] = useState({} as IItem);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        console.log(id);
        let item = await BaseService.get<IItem>('/item', id);
        if (item.ok && item.data) {
            setPageStatus({ pageStatus: EPageStatus.Ok, statusCode: 0 });
            setItems(item.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: item.statusCode })
        }
    }

    const appState = useContext(AppContext);
    const [numberOfItems, setNumberOfItems] = useState("1");



    const AddToCart = (itemToAdd: IItem) => {
        itemToAdd.numberOfItemsToAdd = parseInt(numberOfItems);
        let cartItems = [...appState.items];
        cartItems = [...cartItems, itemToAdd];
        appState.setItemToCart(cartItems);
        itemToAdd.itemAddedToCart = true;

    }




    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <main className="mt-5 pt-4">
                <div className="container dark-grey-text mt-5">

                    <div className="row wow fadeIn">

                        <div className="col-md-6 mb-4">

                            <img src={item.pictureUrl} className="img-fluid" alt="" />

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="p-4">
                                <p className="lead font-weight-bold">{item.title}</p>
                                <div className="mb-3">
                                    <Link to="">
                                        <span className="badge purple mr-1">Category 2</span>
                                    </Link>
                                </div>

                                <p className="lead">
                                    <span className="mr-1">
                                        <del>{new Intl.NumberFormat("en-GB", {
                                            style: "currency",
                                            currency: "EUR"
                                        }).format(item.price + 200)}</del>
                                    </span>
                                    <span>{new Intl.NumberFormat("en-GB", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(item.price)}</span>
                                </p>

                                <p className="lead font-weight-bold">Description</p>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque quia ipsa
                                    sint voluptatibus!
                                    Beatae sit assumenda asperiores iure at maxime atque repellendus maiores quia sapiente.</p>

                                    <div className="text-center">
                        <button type="button" disabled={item.itemAddedToCart} className="btn btn-outline-dark mt-auto" onClick={() => AddToCart(item)} >
                            Add To Cart
                        </button>

                    </div>
                    <div className="col-sm mt-4" >
                        <div className="mx-auto w-25" >
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
                </div>
            </main>



        </>

    );
}



export default PartPage;
