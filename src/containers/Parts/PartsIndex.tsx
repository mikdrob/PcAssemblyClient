import { useEffect, useState } from "react";
import CustomLoader from "../../components/CustomLoader"
import { IItem } from "../../domain/IItem";
// import { IOrder } from "../../domain/IOrder";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import BlockDisplay from "./AddToCart"




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
            <h1 className="m-5">Buy Now</h1>

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
