import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/increment/actions'

function ButtonIncrement(props: any) {

    return (
        <button style={{ marginLeft: '.5rem' }} onClick={props.onClickFunc}>
            +1
        </button>
    )
}

function ButtonDecrement(props: any) {

    return (
        <button style={{ marginLeft: '.5rem' }} onClick={props.onClickFunc}>
            -1
        </button>
    )
}

function Display(props: any) {
    return (
        <input style={{ marginLeft: '.5rem', maxWidth: "3rem" }} value={props.message} />
    )
}

const Increment = () => {
    const dispatch = useDispatch();
    const count = useSelector((store: {count: number})=>store.count);


    // const [counter, setCounter] = useState(1);
    // const incrementCounter = () => setCounter(counter + 1);
    // let decrementCounter = () => setCounter(counter - 1);
    // if (counter <= 1) {
    //     decrementCounter = () => setCounter(1);
    // }


    return (
        <div>
            {/* <ButtonIncrement onClickFunc={incrementCounter} />
            <Display message={counter} />
            <ButtonDecrement onClickFunc={decrementCounter} /> */}
            <p>the counter - {count}</p>
            <button onClick={()=>dispatch(actions.addToCounter(count,2))}>+</button>
        </div>
    );
}

export default Increment;