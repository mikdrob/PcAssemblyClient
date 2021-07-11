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

            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Dream setup</h1>
                        <p className="lead fw-normal text-white-50 mb-0">assemble your pc today</p>
                    </div>
                </div>
            </header>

            <section className="py-5">

                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-2 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
                        {[item.map(item =>
                            <BlockDisplay item={item} key={item.id} />
                        )
                        ]}
                    </div>
                </div>
            </section>



            <div className="d-flex justify-content-center">
                <CustomLoader {...pageStatus} />
            </div>


        </>

    );
}



export default PartsIndex;
