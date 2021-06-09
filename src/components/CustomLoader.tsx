import { EPageStatus } from "../types/EPageStatus";
import Loader from "react-loader-spinner";

const CustomLoader = (props: {pageStatus: EPageStatus, statusCode: number}) => {
    if (props.pageStatus === EPageStatus.Loading){
        return (
            <Loader
              type="Puff"
              color="#000000"
              height={100}
              width={100}
            />
          );
    }
    if (props.pageStatus === EPageStatus.Error){
        return <div className="alert alert-danger" role="alert">Error.. {props.statusCode}</div>
    }
    if (props.pageStatus === EPageStatus.NotAuthorised){
        return <div className="alert alert-danger" role="alert">Not Authorized.. {props.statusCode}</div>
    }
    return <></>
}

export default CustomLoader;