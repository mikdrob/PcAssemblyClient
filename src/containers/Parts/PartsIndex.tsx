import { useEffect, useState } from "react";
import CustomLoader from "../../components/CustomLoader"
import { IItem } from "../../domain/IItem";
// import { IOrder } from "../../domain/IOrder";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import BlockDisplay from "./AddToCart"


// const BlockDisplay = (props: { item: IItem }) => (
//     <div className="card mt-5">
//         <div className="card-horizontal">
//             <div className="col-md-4 px-0">
//                 <img src={props.item.pictureUrl} className="img-fluid" alt="card" />
//             </div>
//             <div className="card-body">
//                 <h4 className="card-title">{props.item.title}</h4>
//                 <p className="font-weight-bold">{new Intl.NumberFormat("en-GB", {
//                     style: "currency",
//                     currency: "EUR"
//                 }).format(props.item.price)}</p>

//             </div>
//         </div>
//     </div>
// );





const PartsIndex = () => {
    const [item, setItems] = useState([] as IItem[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let items = await BaseService.getAll<IItem>('/item');
        // console.log(items.data);
        if (items.ok && items.data) {
            setPageStatus({ pageStatus: EPageStatus.Ok, statusCode: 0 });
            setItems(items.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: items.statusCode })
        }
    }




    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <h1>Buy Now</h1>

            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        {[item.map(item =>
                            <BlockDisplay item={item} key={item.id} />
                        )
                        ]}
                    </div>
                </div>
            </div>


            <div className="d-flex justify-content-center">
                <CustomLoader {...pageStatus} />
            </div>

        </>

    );
}

export default PartsIndex;
