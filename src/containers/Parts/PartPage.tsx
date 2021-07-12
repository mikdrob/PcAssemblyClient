import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CustomLoader from "../../components/CustomLoader";
import Increment from "../../components/Increment";
import { AppContext } from "../../context/AppContext";
import { IItem } from "../../domain/IItem";
import * as actions from '../../redux/increment/actions'
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";



const PartPage = () => {
    const { id } = useParams() as IRouteId;
    const [item, setItems] = useState({} as IItem);
    const appState = useContext(AppContext);
    
    const dispatch = useDispatch();

    const numberOfItems = useSelector((store: { counter: { value: number } }) => store.counter.value);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        dispatch(actions.resetCounter());
        let items = await BaseService.get<IItem>('/item', id);
        if (items.ok && items.data) {
            setPageStatus({ pageStatus: EPageStatus.Ok, statusCode: 0 });
            setItems(items.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: items.statusCode })
        }
    }


    const AddToCart = (itemToAdd: IItem) => {
        itemToAdd.numberOfItemsToAdd = numberOfItems;
        let cartItems = [...appState.items];
        cartItems = [...cartItems, itemToAdd];
        appState.setItemToCart(cartItems);
        itemToAdd.itemAddedToCart = true;

    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="mt-5 pt-4">
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
                                        }).format(item.price * 1.2)}</del>
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
                                            <Increment />
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <CustomLoader {...pageStatus} />
            </div>


        </>

    );
}



export default PartPage;
