import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/increment/actions'

const Increment = () => {
    const dispatch = useDispatch();
    const count = useSelector((store: { counter: { value: number } }) => store.counter.value);

    return (
        <div>
                <div className="d-flex input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-dark" type="button" disabled={count===1 ? true : false} onClick={() => dispatch(actions.substructFromCounter(count))}>-</button>
                    </div>
                    <li className="form-control" style={{textAlign: "center"}}>{count.toString()}</li>
                    <div className="input-group-append">
                        <button className="btn btn-dark" type="button" onClick={() => dispatch(actions.addToCounter(count))}>+</button>
                    </div>
                </div>
        </div>
    );
}

export default Increment;